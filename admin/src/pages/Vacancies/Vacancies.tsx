import { useState, useRef, useEffect } from "react";
import { supabase } from "./../../lib/supabase";
import type { Vacancy, VacancyForm } from "../../interfaces/Vacancy";
import ImageDropzone from "../../components/ImgDropzone/ImgDropzone";
import MagicIcon from "../../components/icons/MagicIcon";
import Pagination from "../../components/Pagination/Pagination";
import "./styles.scss";
import Menu from "../../components/Menu/Menu";

const EMPTY_FORM: VacancyForm = {
	id: "",
	img: null,
	is_active: true,
	place: "",
	address: "",
	address_url: "",
	title: "",
	description: "",
	benefits: [""],
	salary: "",
	requirements: null as string[] | null,
	responsibilities: null as string[] | null,
	badges: null as string[] | null,
	job_type: "",
	hot_vacancy: false,
	current_img: null,
};

type LeadsProps = {
	vacancies: Vacancy[];
	load: () => Promise<void>;
	setVacancies: React.Dispatch<React.SetStateAction<Vacancy[]>>;
};

const Vacancies = ({ vacancies, setVacancies, load }: LeadsProps) => {
	const [formVisible, setFormVisible] = useState(false);
	const [isNew, setIsNew] = useState(false);
	const [filter, setFilter] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [idToDelete, setIdToDelete] = useState("");
	const [idToUpdate, setIdToUpdate] = useState("");
	const [aiLoading, setAiLoading] = useState(false);

	const containerRef = useRef<HTMLDivElement | null>(null);

	const filteredVacancies = vacancies.filter((vacancy) =>
		Object.values(vacancy).some((value) =>
			String(value).toLowerCase().includes(filter.toLowerCase()),
		),
	);

	const [form, setForm] = useState(EMPTY_FORM);

	const handleForm = (
		name: string,
		value: string | string[] | boolean | number | File | null,
	) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const modal = useRef<HTMLDivElement>(null);

	// Supabase
	const insertOne = async (data: VacancyForm) => {
		setError(null);
		setLoading(true);

		const uploadImage = async (file: File) => {
			const fileName = file.name;

			const { error } = await supabase.storage
				.from("vacancies")
				.upload(fileName, file);

			if (error) {
				console.log(`Помилка завантаження фото: ${error.message}`);
				return null;
			}

			const { data: urlData } = supabase.storage
				.from("vacancies")
				.getPublicUrl(fileName);

			return urlData.publicUrl;
		};

		let imageUrl: string | null = null;

		if (data.img) {
			imageUrl = await uploadImage(data.img);
		}

		// remove File object
		const { img, ...rest } = data;

		const cleaned: Partial<Vacancy> = {
			...rest,
			badges: data.badges?.filter((b) => b.trim() !== ""),
			benefits: data.benefits?.filter((d) => d.trim() !== ""),
			responsibilities: data.responsibilities?.filter((r) => r.trim() !== ""),
			requirements: data.requirements?.filter((r) => r.trim() !== ""),
			img: imageUrl,
		};

		const { error } = await supabase.from("vacancies").insert([cleaned]);
		if (error) {
			if (error.code === "23505") setError("Вакансія з таким ID вже існує");
			else console.error("Insert error:", error.message);
			modal.current?.scrollTo({ top: 0, behavior: "smooth" });
			setLoading(false);
			return false;
		}
		await load();
		setLoading(false);
		setFormVisible(false);
		setForm(EMPTY_FORM);
		setIsNew(false);
		return true;
	};

	// TODO: learn this
	const deleteOne = async (id: string) => {
		// 1. Get the vacancy to extract image filename
		const { data: vacancy } = await supabase
			.from("vacancies")
			.select("img")
			.eq("id", id)
			.single();

		// 2. Delete the image from storage if it exists
		if (vacancy?.img) {
			const fileName = vacancy.img.split("/").pop(); // extracts "1779959644976-665rad.png"
			if (fileName) {
				const { error: storageError } = await supabase.storage
					.from("vacancies")
					.remove([fileName]);
				if (storageError)
					console.error("Storage delete error:", storageError.message);
			}
		}

		const { error } = await supabase.from("vacancies").delete().eq("id", id);
		if (error) console.error("Delete error:", error.message);
		else load();
	};

	const updateVacancy = async (id: string, data: Partial<VacancyForm>) => {
		setError(null);
		setLoading(true);

		const uploadImage = async (file: File) => {
			const fileName = file.name;

			const { error } = await supabase.storage
				.from("vacancies")
				.upload(fileName, file, {
					contentType: file.type, // Допомагає серверу Supabase правильно прийняти бінарні дані
					cacheControl: "3600",
					upsert: false,
				});

			if (error) {
				console.log(`Помилка завантаження фото: ${error.message}`);
				return null;
			}

			const { data: urlData } = supabase.storage
				.from("vacancies")
				.getPublicUrl(fileName);

			return urlData.publicUrl;
		};

		let imageUrl: string | null = data.current_img ?? null; // keep existing by default

		if (data.img) {
			// Delete old image from storage first
			if (data.current_img) {
				const oldFileName = data.current_img.split("/").pop();
				if (oldFileName) {
					await supabase.storage.from("vacancies").remove([oldFileName]);
				}
			}
			imageUrl = await uploadImage(data.img);
		}

		// remove File object
		const { img, current_img, ...rest } = data;

		const cleaned: Partial<Vacancy> = {
			...rest,
			badges: data.badges?.filter((b) => b.trim() !== ""),
			benefits: data.benefits?.filter((d) => d.trim() !== ""),
			responsibilities: data.responsibilities?.filter((r) => r.trim() !== ""),
			requirements: data.requirements?.filter((r) => r.trim() !== ""),
			img: imageUrl,
		};

		if (rest.id !== idToUpdate) {
			// ID changed — delete old row, insert new one
			const { error: deleteError } = await supabase
				.from("vacancies")
				.delete()
				.eq("id", idToUpdate);

			if (deleteError) {
				console.error("Delete error:", deleteError.message);
				setLoading(false);
				return false;
			}

			const { error: insertError } = await supabase
				.from("vacancies")
				.insert([cleaned]);

			if (insertError) {
				if (insertError.code === "23505")
					setError("Вакансія з таким ID вже існує");
				else console.error("Insert error:", insertError.message);
				setLoading(false);
				return false;
			}
		} else {
			// ID unchanged — normal update
			const { error } = await supabase
				.from("vacancies")
				.update(cleaned)
				.eq("id", id);
			if (error) {
				if (error.code === "23505") setError("Вакансія з таким ID вже існує");
				else console.error("Insert error:", error.message);
				modal.current?.scrollTo({ top: 0, behavior: "smooth" });
				setLoading(false);
				return false;
			}
		}

		await load();
		setLoading(false);
		setFormVisible(false);
		setForm(EMPTY_FORM);
		return true;
	};

	const toggleActive = async (id: string, value: boolean) =>
		supabase.from("vacancies").update({ is_active: value }).eq("id", id);

	const toggleHotVacancy = async (id: string, value: boolean) =>
		supabase.from("vacancies").update({ hot_vacancy: value }).eq("id", id);

	const handleSave = async (form: VacancyForm) => {
		if (isNew) {
			await insertOne(form);
		} else {
			await updateVacancy(form.id, form);
		}
	};

	const handleToggle = async (id: string, current: boolean) => {
		await toggleActive(id, !current);
		setVacancies((prev) =>
			prev.map((v) => (v.id === id ? { ...v, is_active: !current } : v)),
		);
	};

	const handleToggleHotVacancy = async (id: string, current: boolean) => {
		await toggleHotVacancy(id, !current);
		setVacancies((prev) =>
			prev.map((v) => (v.id === id ? { ...v, hot_vacancy: !current } : v)),
		);
	};

	const totalPages = Math.ceil(vacancies.length / 50);

	const uniqueVacanciesPlaces = [...new Set(vacancies.map((v) => v.place))];

	// TODO: learn this
	const uniqueVacanciesBadges = [
		...new Set(vacancies.flatMap((v) => v.badges?.map((b) => b) ?? [])),
	];

	const handleDelete = () => {
		deleteOne(idToDelete);
		setIdToDelete("");
		setDeleteModal(false);
	};

	const generateId = async () => {
		if (!form.title) return;

		setAiLoading(true);

		try {
			const res = await fetch(
				"https://api.groq.com/openai/v1/chat/completions",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
					},
					body: JSON.stringify({
						model: "llama-3.3-70b-versatile",
						messages: [
							{
								role: "system",
								content: `You convert Ukrainian or Czech job titles into Czech URL slugs.

OUTPUT FORMAT (strict):
- Return ONLY the slug, nothing else
- No quotes, no explanation, no prefix, no newline before/after
- Lowercase ASCII only
- Words separated by single hyphens
- No diacritics (á→a, č→c, ě→e, í→i, ň→n, ř→r, š→s, ť→t, ú→u, ů→u, ý→y, ž→z)
- Max 5 words
- Translate Ukrainian terms to Czech first, then slugify
- Keep city/location in parentheses as the last word(s)
- Strip filler words (v, na, pro, do, the, a) unless needed for meaning

EXAMPLES:
Input: "Прибирання в будинку для літніх людей (Nepomuk)"
Output: uklizecka-domov-pro-seniory-nepomuk

Input: "Робітник на склад (Plzeň)"
Output: skladnik-plzen

Input: "Údržbář budov (Praha 4)"
Output: udrzbar-budov-praha-4

Input: "Помічник кухаря (Brno)"
Output: pomocnik-kuchare-brno

Input: "Швачка на виробництві"
Output: svadlena-vyroba`,
							},
							{
								role: "user",
								content: form.title,
							},
						],
					}),
				},
			);

			const data = await res.json();
			const slug = data.choices[0].message.content.trim();
			handleForm("id", slug);
		} catch (error) {
			console.log(error);
		} finally {
			setAiLoading(false);
		}
	};

	useEffect(() => {
		if (!containerRef.current) return;
		containerRef.current.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, [currentPage]);

	return (
		<>
			<div
				ref={modal}
				className={`modal ${formVisible ? "modal--visible" : ""}`}
			>
				<button
					className="close-btn modal-close-btn"
					onClick={() => {
						setFormVisible(false);
						setForm(EMPTY_FORM);
						setIsNew(false);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-x-lg"
						viewBox="0 0 16 16"
					>
						<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
					</svg>
				</button>
				<p style={{ fontSize: "1.5rem", fontWeight: "600" }}>
					{isNew ? "Створити вакансію" : "Змінити вакансію"}
				</p>
				{error && <strong style={{ color: "red" }}>{error}</strong>}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSave(form);
					}}
				>
					<div className="input-container">
						<label htmlFor="title">Назва (Обов'язково)</label>
						<input
							id="title"
							className="input"
							type="text"
							name="title"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.title}
							placeholder="Наприклад: Працівниця на кухню в місті Колін"
						/>
					</div>
					<div className="input-container">
						<label htmlFor="id">ID (Обов'язково)</label>
						<input
							id="id"
							className="input"
							type="text"
							name="id"
							onChange={(e) => {
								handleForm(e.target.name, e.target.value);
								setError(null);
							}}
							value={form.id}
							placeholder="Спочатку заповніть поле Назва"
							disabled={form.title === ""}
						/>
						<button
							className="ai-btn"
							type="button"
							onClick={generateId}
							disabled={form.title === ""}
						>
							<MagicIcon />
							<span> {aiLoading ? "Зачекайте..." : "Згенерувати ID"}</span>
							<div className="hoverEffect">
								<div></div>
							</div>
						</button>
					</div>
					<div className="input-container">
						<label htmlFor="salary">Заробітна плата (Обов'язково)</label>
						<input
							id="salary"
							className="input"
							type="text"
							name="salary"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.salary}
						/>
					</div>
					<div className="input-container">
						<label htmlFor="img">Зображення</label>
						{/* TODO: LEARN THIS */}
						<ImageDropzone
							onFileSelect={(file) => handleForm("img", file)}
							previewUrl={
								form.img ? URL.createObjectURL(form.img) : form.current_img
							}
						/>
					</div>
					<div className="input-container">
						<label htmlFor="place">Місто (Обов'язково)</label>
						<div className="input" style={{ display: "flex" }}>
							<input
								id="place"
								style={{ width: "100%" }}
								type="text"
								name="place"
								onChange={(e) => handleForm(e.target.name, e.target.value)}
								value={form.place}
								placeholder="Вкажіть місто або виберіть з списку"
							/>
							<select
								name="place"
								onChange={(e) => handleForm(e.target.name, e.target.value)}
								value={""}
								id=""
							>
								<option value=""></option>
								{uniqueVacanciesPlaces.map((p, i) => {
									return (
										<option key={i} value={p}>
											{p}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div className="input-container">
						<label htmlFor="address">Адреса</label>
						<input
							id="address"
							className="input"
							type="text"
							name="address"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.address}
							placeholder="Наприклад: Řešovská 852/10, 181 00 Praha 8"
						/>
					</div>
					<div className="input-container">
						<label htmlFor="address-url">Адреса (Посилання)</label>
						<input
							id="address-url"
							className="input"
							type="text"
							name="address_url"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.address_url}
							placeholder="Наприклад: https://maps.app.goo.gl/5HZe2oFUz2cTk5AT8"
						/>
					</div>

					<div className="input-container">
						<label htmlFor="desc">Опис</label>
						<textarea
							id="desc"
							className="textarea"
							name="description"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.description}
							rows={10}
						/>
					</div>
					<div className="input-container">
						<label>Переваги</label>
						{form.benefits.map((item, i) => (
							<div key={i} style={{ display: "flex", gap: 8 }}>
								<input
									className="input"
									style={{ width: "100%" }}
									type="text"
									value={item}
									onChange={(e) => {
										const next = [...form.benefits] as string[];
										next[i] = e.target.value;
										handleForm("benefits", next);
									}}
									placeholder={`Вкажіть опис ${i + 1}`}
								/>
								<button
									className="delete-btn"
									type="button"
									onClick={() =>
										handleForm(
											"benefits",
											form.benefits.filter((_, idx) => idx !== i),
										)
									}
								>
									✕
								</button>
							</div>
						))}
						<button
							className="update-btn"
							style={{ margin: "0 auto" }}
							type="button"
							onClick={() => handleForm("benefits", [...form.benefits, ""])}
						>
							+
						</button>
					</div>

					<div className="input-container">
						<label>Вимоги</label>
						{(form.requirements ?? [""]).map((item, i) => (
							<div key={i} style={{ display: "flex", gap: 8 }}>
								<input
									className="input"
									style={{ width: "100%" }}
									type="text"
									value={item}
									onChange={(e) => {
										const next = [...(form.requirements ?? [])] as string[];
										next[i] = e.target.value;
										handleForm("requirements", next);
									}}
									placeholder={`Вкажіть вимогу ${i + 1}`}
								/>
								<button
									className="delete-btn"
									type="button"
									onClick={() =>
										handleForm(
											"requirements",
											(form.requirements ?? []).filter((_, idx) => idx !== i),
										)
									}
								>
									✕
								</button>
							</div>
						))}
						<button
							className="update-btn"
							style={{ margin: "0 auto" }}
							type="button"
							onClick={() =>
								handleForm("requirements", [...(form.requirements ?? []), ""])
							}
						>
							+
						</button>
					</div>
					<div className="input-container">
						<label>Обов'язки</label>
						{(form.responsibilities ?? [""]).map((item, i) => (
							<div key={i} style={{ display: "flex", gap: 8 }}>
								<input
									className="input"
									style={{ width: "100%" }}
									type="text"
									value={item}
									onChange={(e) => {
										const next = [...(form.responsibilities ?? [])] as string[];
										next[i] = e.target.value;
										handleForm("responsibilities", next);
									}}
									placeholder={`Вкажіть обов'язок ${i + 1}`}
								/>
								<button
									className="delete-btn"
									type="button"
									onClick={() =>
										handleForm(
											"responsibilities",
											(form.responsibilities ?? []).filter(
												(_, idx) => idx !== i,
											),
										)
									}
								>
									✕
								</button>
							</div>
						))}
						<button
							className="update-btn"
							style={{ margin: "0 auto" }}
							type="button"
							onClick={() =>
								handleForm("responsibilities", [
									...(form.responsibilities ?? []),
									"",
								])
							}
						>
							+
						</button>
					</div>
					<div className="input-container">
						<label htmlFor="job-type">Тип роботи</label>
						<input
							id="job-type"
							className="input"
							type="text"
							name="job_type"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.job_type}
							placeholder="Наприклад: Доглядання"
						/>
					</div>
					<div className="input-container">
						<label>Ключові слова</label>
						{(form.badges ?? [""]).map((item, i) => (
							<div key={i} style={{ display: "flex", gap: 8 }}>
								<div className="input" style={{ display: "flex" }}>
									<input
										style={{ width: "100%" }}
										type="text"
										value={item}
										onChange={(e) => {
											const next = [...(form.badges ?? [])] as string[];
											next[i] = e.target.value;
											handleForm("badges", next);
										}}
										placeholder={`Вкажіть ключове слово пов'язане з вакансією або виберіть з списку`}
									/>
									<select
										className="select"
										name="badges"
										onChange={(e) => {
											const next = [...(form.badges ?? [])] as string[];
											next[i] = e.target.value;
											handleForm("badges", next);
										}}
										value={""}
										id=""
									>
										<option value=""></option>
										{uniqueVacanciesBadges
											.filter(
												(p) =>
													// TODO: learn this
													!form.badges?.includes(p) || form.badges[i] === p,
											)
											.map((p, i) => {
												return (
													<option key={i} value={p}>
														{p}
													</option>
												);
											})}
									</select>
								</div>
								<button
									className="delete-btn"
									type="button"
									onClick={() =>
										handleForm(
											"badges",
											(form.badges ?? []).filter((_, idx) => idx !== i),
										)
									}
								>
									✕
								</button>
							</div>
						))}
						<button
							className="update-btn"
							style={{ margin: "0 auto" }}
							type="button"
							onClick={() => handleForm("badges", [...(form.badges ?? []), ""])}
						>
							+
						</button>
					</div>
					<button className="submit-btn" type="submit">
						{loading
							? isNew
								? "Створення..."
								: "Збереження..."
							: isNew
								? "Створити вакансію"
								: "Змінити вакансію"}
					</button>
				</form>
			</div>
			<div
				className={`curtain ${formVisible || deleteModal ? "curtain--visible" : ""}`}
			></div>
			<div
				className={`delete-modal ${deleteModal ? "delete-modal--visible" : ""}`}
			>
				<strong>Ви точно хочете видалити цей запис?</strong>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						gap: "10px",
					}}
				>
					<button
						onClick={() => {
							setIdToDelete("");
							setDeleteModal(false);
						}}
						style={{
							height: "40px",
							padding: "0 10px",
							borderRadius: "20px",
							background: "#000",
							color: "#fff",
							fontWeight: 600,
						}}
					>
						Скасувати
					</button>
					<button
						style={{
							height: "40px",
							padding: "0 10px",
							borderRadius: "20px",
							background: "rgb(222, 92, 77)",
							color: "#fff",
							fontWeight: 600,
						}}
						onClick={() => handleDelete()}
					>
						Підтвердити
					</button>
				</div>
			</div>
			<main className="main">
				<Menu />
				<h1 className="main__title">Вакансії</h1>
				<div ref={containerRef} className="container">
					<div
						style={{
							position: "sticky",
							top: "0px",
							padding: "10px 0",
							background: "#fff",
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<input
							className="search-input"
							onChange={(e) => setFilter(e.target.value)}
							value={filter}
							type="text"
							placeholder="Пошук"
						/>
						<button
							className="create-btn"
							onClick={() => {
								setIsNew(true);
								setFormVisible(true);
							}}
						>
							Створити вакансію
						</button>
					</div>
					<table>
						<thead>
							<tr>
								<th>№</th>
								<th>Зображення</th>
								<th>Назва</th>
								<th>Місто</th>
								<th>Оновлено</th>
								<th>Статус</th>
								<th>Гаряча вакансія</th>
								<th>Інструмети</th>
							</tr>
						</thead>
						<tbody>
							{filteredVacancies.map((v, i) => {
								const updated = new Date(v.updated_at);

								return (
									<tr key={v.id}>
										<td>{i + 1}</td>
										<td>
											{v.img && (
												<img src={v.img} width={50} height={50} alt="" />
											)}
										</td>
										<td style={{ width: "99%" }}>{v.title}</td>
										<td>{v.place}</td>
										<td>
											<p>{updated.toLocaleDateString()}</p>
											<p>{updated.toLocaleTimeString()}</p>
										</td>
										<td>
											<button
												onClick={() => handleToggle(v.id, v.is_active)}
												className={`status-btn ${!v.is_active ? "status-btn--inactive" : ""}`}
											>
												{v.is_active ? "Активна" : "Неактивна"}
											</button>
										</td>
										<td>
											<button
												onClick={() =>
													handleToggleHotVacancy(v.id, v.hot_vacancy)
												}
												className={`status-btn ${!v.hot_vacancy ? "status-btn--inactive" : ""}`}
											>
												{v.hot_vacancy ? "Гаряча" : "Не гаряча"}
											</button>
										</td>
										<td>
											<div
												style={{
													display: "flex",
													gap: "5px",
												}}
											>
												<button
													className="update-btn"
													onClick={() => {
														setFormVisible(true);
														setIdToUpdate(v.id);
														setForm({
															...v,
															img: null,
															current_img: v.img,
															address: v.address ?? "",
															address_url: v.address_url ?? "",
															requirements: v.requirements,
															responsibilities: v.responsibilities,
															badges: v.badges,
														});
													}}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														className="bi bi-pencil-fill"
														viewBox="0 0 16 16"
													>
														<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
													</svg>
												</button>
												<button
													className="delete-btn"
													onClick={() => {
														setIdToDelete(v.id);
														setDeleteModal(true);
													}}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														className="bi bi-x-lg"
														viewBox="0 0 16 16"
													>
														<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
													</svg>
												</button>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							// position: "sticky",
							bottom: "0px",
							background: "white",
							padding: "10px 0",
							marginTop: "auto",
						}}
					>
						<div style={{ display: "flex", gap: "5px" }}>
							<p
								style={{
									background: "hsl(0, 0%, 95%)",
									height: "40px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									padding: "0 10px",
									borderRadius: "20px",
									fontWeight: "600",
								}}
							>
								{(currentPage - 1) * 50 + 1} -{" "}
								{Math.min(currentPage * 50, filteredVacancies.length)}
							</p>
							<p
								style={{
									background: "hsl(0, 0%, 95%)",
									height: "40px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									padding: "0 10px",
									borderRadius: "20px",
									fontWeight: "600",
								}}
							>
								Всього: {filteredVacancies.length}
							</p>
						</div>
						<Pagination
							totalPages={totalPages}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
					</div>
				</div>
			</main>
		</>
	);
};

export default Vacancies;
