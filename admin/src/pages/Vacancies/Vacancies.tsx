import { useEffect, useState } from "react";
import { supabase } from "./../../lib/supabase";

export interface VacancyInterface {
	id: string;
	img: string;
	is_active: boolean;
	place: string;
	address: string;
	address_url: string;
	title: string;
	description: string[];
	salary: number;
	requirements: string[];
	responsibilities: string[];
	job_type: string;
	updated_at: string;
}

export type VacancySave = Omit<VacancyInterface, "updated_at">;

const EMPTY_FORM = {
	id: "",
	img: "",
	is_active: true,
	place: "",
	address: "",
	address_url: "",
	title: "",
	description: [""],
	salary: 0,
	requirements: [""],
	responsibilities: [""],
	job_type: "",
};

const Vacancies = () => {
	const [vacancies, setVacancies] = useState<VacancyInterface[]>([]);
	const [formVisible, setFormVisible] = useState(false);
	const [isNew, setIsNew] = useState(false);
	const [filter, setFilter] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const filteredVacancies = vacancies.filter((vacancy) =>
		Object.values(vacancy).some((value) =>
			String(value).toLowerCase().includes(filter.toLowerCase()),
		),
	);

	const [form, setForm] = useState(EMPTY_FORM);

	const handleForm = (
		name: string,
		value: string | string[] | boolean | number,
	) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	// Supabase
	const getAll = async () =>
		supabase
			.from("vacancies")
			.select("*")
			.order("updated_at", { ascending: false });

	const load = async () => {
		const { data } = await getAll();
		setVacancies(data ?? []);
	};

	useEffect(() => {
		load();
	}, []);

	const insertOne = async (data: VacancySave) => {
		const { error } = await supabase.from("vacancies").insert([data]);
		if (error) console.error("Insert error:", error.message);
		else {
			await load();
			setFormVisible(false);
			setForm(EMPTY_FORM);
		}
	};

	const deleteOne = async (id: string) => {
		const { error } = await supabase.from("vacancies").delete().eq("id", id);
		if (error) console.error("Delete error:", error.message);
		else load();
	};

	const updateOne = async (id: string, data: Partial<VacancySave>) =>
		supabase.from("vacancies").update(data).eq("id", id);

	const toggleActive = async (id: string, value: boolean) =>
		supabase.from("vacancies").update({ is_active: value }).eq("id", id);

	const handleSave = async (form: VacancySave) => {
		if (isNew) {
			await insertOne(form);
		} else {
			await updateOne(form.id, form);
		}
		setForm(EMPTY_FORM);
		setIsNew(false);
		await load();
		setFormVisible(false);
	};

	const handleToggle = async (id: string, current: boolean) => {
		await toggleActive(id, !current);
		setVacancies((prev) =>
			prev.map((v) => (v.id === id ? { ...v, is_active: !current } : v)),
		);
	};

	const totalPages = Math.ceil(vacancies.length / 50);

	return (
		<>
			<div className={`modal ${formVisible ? "modal--visible" : ""}`}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
					}}
				>
					<p style={{ fontSize: "1.5rem" }}>
						{isNew ? "Створити вакансію" : "Змінити вакансію"}
					</p>
					<button className="close-btn" onClick={() => setFormVisible(false)}>
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
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSave(form);
					}}
				>
					<div className="input-container">
						<label htmlFor="">ID</label>
						<input
							type="text"
							name="id"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.id}
						/>
					</div>
					<div className="input-container">
						<label htmlFor="">Зображення</label>
						<input
							type="text"
							name="img"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.img}
						/>
					</div>
					<div className="input-container">
						<label htmlFor="">Місто</label>
						<input
							type="text"
							name="place"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.place}
						/>
					</div>
					<div className="input-container">
						<label htmlFor="">Адреса</label>
						<input
							type="text"
							name="address"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.address}
						/>
					</div>
					<div className="input-container">
						<label htmlFor="">Адреса (ссилка)</label>
						<input
							type="text"
							name="address_url"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.address_url}
						/>
					</div>
					<div className="input-container">
						<label htmlFor="">Назва</label>
						<input
							type="text"
							name="title"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.title}
						/>
					</div>
					<div className="input-container">
						<label>Опис</label>
						{form.description.map((item, i) => (
							<div key={i} style={{ display: "flex", gap: 8 }}>
								<input
									type="text"
									value={item}
									onChange={(e) => {
										const next = [...form.description] as string[];
										next[i] = e.target.value;
										handleForm("description", next);
									}}
									placeholder={`Опис ${i + 1}`}
								/>
								<button
									className="delete-btn"
									type="button"
									onClick={() =>
										handleForm(
											"description",
											form.description.filter((_, idx) => idx !== i),
										)
									}
								>
									✕
								</button>
							</div>
						))}
						<button
							type="button"
							onClick={() =>
								handleForm("description", [...form.description, ""])
							}
						>
							+ Новий рядок
						</button>
					</div>
					<div className="input-container">
						<label htmlFor="">Заробітна плата</label>
						<input
							type="number"
							name="salary"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.salary}
						/>
					</div>
					<div className="input-container">
						<label>Вимоги</label>
						{form.requirements.map((item, i) => (
							<div key={i} style={{ display: "flex", gap: 8 }}>
								<input
									type="text"
									value={item}
									onChange={(e) => {
										const next = [...form.requirements] as string[];
										next[i] = e.target.value;
										handleForm("requirements", next);
									}}
									placeholder={`Вимога ${i + 1}`}
								/>
								<button
									className="delete-btn"
									type="button"
									onClick={() =>
										handleForm(
											"requirements",
											form.requirements.filter((_, idx) => idx !== i),
										)
									}
								>
									✕
								</button>
							</div>
						))}
						<button
							type="button"
							onClick={() =>
								handleForm("requirements", [...form.requirements, ""])
							}
						>
							+ Новий рядок
						</button>
					</div>
					<div className="input-container">
						<label>Обов'язки</label>
						{form.responsibilities.map((item, i) => (
							<div key={i} style={{ display: "flex", gap: 8 }}>
								<input
									type="text"
									value={item}
									onChange={(e) => {
										const next = [...form.responsibilities] as string[];
										next[i] = e.target.value;
										handleForm("responsibilities", next);
									}}
									placeholder={`Item ${i + 1}`}
								/>
								<button
									className="delete-btn"
									type="button"
									onClick={() =>
										handleForm(
											"responsibilities",
											form.responsibilities.filter((_, idx) => idx !== i),
										)
									}
								>
									✕
								</button>
							</div>
						))}
						<button
							type="button"
							onClick={() =>
								handleForm("responsibilities", [...form.responsibilities, ""])
							}
						>
							+ Новий рядок
						</button>
					</div>
					<div className="input-container">
						<label htmlFor="">Тип роботи</label>
						<input
							type="text"
							name="job_type"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.job_type}
						/>
					</div>
					<button className="submit-btn" type="submit">
						{isNew ? "Створити вакансію" : "Змінити вакансію"}
					</button>
				</form>
			</div>
			<div className={`curtain ${formVisible ? "curtain--visible" : ""}`}></div>
			<main className="main">
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						paddingTop: "25px",
					}}
				>
					<h1 className="main__title">Вакансії {vacancies.length}</h1>
					<button
						className="create-vacancy-btn"
						onClick={() => {
							setIsNew(true);
							setFormVisible(true);
						}}
					>
						Створити вакансію
					</button>
				</div>
				<div className="container">
					<div
						style={{
							position: "sticky",
							top: "0px",
							padding: "10px 0",
							background: "#fff",
						}}
					>
						<input
							style={{ height: "40px" }}
							onChange={(e) => setFilter(e.target.value)}
							value={filter}
							type="text"
							placeholder="Пошук"
						/>
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
											<img src={v.img} width={50} height={50} alt="" />
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
														setForm({
															...v,
															img: v.img ?? "",
															address: v.address ?? "",
															address_url: v.address_url ?? "",
															requirements: v.requirements ?? [""],
															responsibilities: v.responsibilities ?? [""],
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
													onClick={() => deleteOne(v.id)}
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
							position: "sticky",
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
						<div style={{ display: "flex", gap: "5px" }}>
							{Array.from({ length: totalPages }, (_, i) => (
								<button
									key={i}
									onClick={() => setCurrentPage(i + 1)}
									className={`pag-btn ${currentPage === i + 1 ? "pag-btn--active" : ""}`}
								>
									{i + 1}
								</button>
							))}
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Vacancies;
