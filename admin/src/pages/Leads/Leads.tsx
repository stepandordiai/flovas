import { supabase, supabaseF } from "../../lib/supabase";
import { useEffect, useRef, useState } from "react";
import EditIcon from "../../components/icons/EditIcon";
import TrashIcon from "../../components/icons/TrashIcon";
import type { Lead } from "../../interfaces/Lead";
import Pagination from "../../components/Pagination/Pagination";
import Menu from "../../components/Menu/Menu";
import TelIcon from "../../components/icons/TelIcon";
import DotsIcon from "../../components/icons/DotsIcon";
import { trimValue } from "../../helpers/trimValue";
import "./styles.scss";

const EMPTY_FORM: Lead = {
	id: "",
	name: "",
	tel: "",
	address: "",
	position: "",
	message: "",
	status: "Новий",
	messengers: [],
	gender: "",
	created_at: new Date(),
	updated_at: new Date(),
};

type LeadsProps = {
	leads: Lead[];
	load: () => Promise<void>;
	setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
};

const Leads = ({ leads, setLeads, load }: LeadsProps) => {
	const [isNew, setIsNew] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [form, setForm] = useState(EMPTY_FORM);
	const [error, setError] = useState<null | string>(null);
	const [filter, setFilter] = useState("");
	const [deleteModal, setDeleteModal] = useState(false);
	const [idToDelete, setIdToDelete] = useState("");
	const [formLoading, setFormLoading] = useState(false);
	const [editable, setEditable] = useState(false);

	const containerRef = useRef<HTMLDivElement | null>(null);

	// TODO: learn this
	const filteredLeads = leads.filter((lead) =>
		Object.values(lead).some((value) =>
			String(value).toLowerCase().includes(filter.toLowerCase()),
		),
	);

	const handleForm = (name: string, value: unknown) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const [currentPage, setCurrentPage] = useState(1);

	// Supabase
	// TODO: LEARN THIS
	const insertLead = async (data: Lead) => {
		setError(null);
		setFormLoading(true);

		try {
			const { id, tel, created_at, updated_at, ...rest } = data;

			const { error } = await supabase
				.from("leads")
				.insert([{ tel: trimValue(tel), ...rest }]);
			const { error: errorF } = await supabaseF.from("leads").insert([rest]);

			// exists in both — show error
			if (error?.code === "23505" && errorF?.code === "23505") {
				setError("Лід з таким номером вже існує");
				return false;
			}

			// handle unexpected errors
			if (error && error.code !== "23505") {
				console.error("DB1:", error.message);
				return false;
			}
			if (errorF && errorF.code !== "23505") {
				console.error("DB2:", errorF.message);
				return false;
			}

			// notify telegram
			fetch(`${import.meta.env.VITE_NOTIFY_URL}/api/notify-lead`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ tel, ...rest }),
			}).catch(() => {});

			return true;
		} finally {
			setFormLoading(false);
		}
	};

	const updateLead = async (id: string, data: Lead) => {
		setError(null);
		setFormLoading(true);

		try {
			const { id: _, tel, created_at, updated_at, ...rest } = data;
			const { error } = await supabase
				.from("leads")
				.update({ tel: trimValue(tel), ...rest })
				.eq("id", id);

			if (error) {
				if (error.code === "23505") setError("Лід з таким номером вже існує");
				else console.error("Insert error:", error.message);
				return false;
			}

			return true;
		} finally {
			setFormLoading(false);
		}
	};

	const deleteLead = async (id: string) => {
		const { error } = await supabase.from("leads").delete().eq("id", id);
		if (error) console.error("Delete error:", error.message);
		else load();
	};

	// FIXME:
	const handleSave = async (form: any) => {
		if (isNew) {
			const ok = await insertLead(form);
			if (!ok) return;
		} else {
			await updateLead(form.id, form);
		}
		setIsNew(false);
		setEditable(false);
		await load();
	};

	const handleDelete = () => {
		deleteLead(idToDelete);
		setIdToDelete("");
		setDeleteModal(false);
		setModalVisible(false);
		setForm(EMPTY_FORM);
	};

	const toggleIsWorking = async (id: string, value: string) =>
		supabase.from("leads").update({ status: value }).eq("id", id);

	const handleStatus = async (id: string, current: string) => {
		await toggleIsWorking(id, current);
		setLeads((prev) =>
			prev.map((v) => (v.id === id ? { ...v, status: current } : v)),
		);
	};

	const handleMessenger = (value: string, checked: boolean) => {
		const current = form.messengers ?? [];
		const exists = current.find((m) => m.name === value);

		const updated = exists
			? current.map((m) =>
					m.name === value ? { ...m, isAvailable: checked } : m,
				)
			: [...current, { name: value, isAvailable: checked }];
		handleForm("messengers", updated);
	};

	const totalPages = Math.ceil(leads.length / 50);

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
			<div className={`modal ${modalVisible ? "modal--visible" : ""}`}>
				<button
					style={{ alignSelf: "flex-end", position: "sticky", top: "0px" }}
					className="close-btn"
					onClick={() => {
						setModalVisible(false);
						setForm(EMPTY_FORM);
						setEditable(false);
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
				<p className="form__title">{isNew ? "Створити лід" : "Змінити лід"}</p>
				{error && <p style={{ color: "red" }}>{error}</p>}
				{!isNew && (
					<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
						<div>
							<p className="form__label">Створено</p>
							<p>
								{new Date(form.created_at).toLocaleDateString()}{" "}
								{new Date(form.created_at).toLocaleTimeString()}
							</p>
						</div>
						<div>
							<p className="form__label">Оновлено</p>
							<p>
								{new Date(form.updated_at).toLocaleDateString()}{" "}
								{new Date(form.updated_at).toLocaleTimeString()}
							</p>
						</div>
					</div>
				)}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSave(form);
					}}
				>
					<div className="input-container">
						<label className="form__label" htmlFor="name">
							Імя
						</label>
						<input
							id="name"
							className={`input ${!editable ? "input--disabled" : ""}`}
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.name}
							name="name"
							type="text"
							disabled={!editable}
						/>
					</div>
					<div className="input-container">
						<label className="form__label" htmlFor="tel">
							Номер телефону
						</label>
						<input
							id="tel"
							className={`input ${!editable ? "input--disabled" : ""}`}
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.tel}
							name="tel"
							type="tel"
							disabled={!editable}
						/>
					</div>
					<div>
						<label className="form__label" htmlFor="">
							Месенджери
						</label>
						<div style={{ display: "flex", flexWrap: "wrap" }}>
							{(["whatsapp", "telegram", "viber"] as const).map((name) => {
								const messenger = form.messengers?.find((m) => m.name === name);
								const isAvailable = messenger?.isAvailable;

								return (
									<div key={name}>
										<label
											className="form__label"
											style={{ textTransform: "capitalize" }}
										>
											{name}
										</label>
										<div style={{ display: "flex" }}>
											<label>
												<input
													type="radio"
													checked={isAvailable === true}
													onChange={() => handleMessenger(name, true)}
													disabled={!editable}
												/>
												Так
											</label>
											<label>
												<input
													type="radio"
													checked={isAvailable === false}
													onChange={() => handleMessenger(name, false)}
													disabled={!editable}
												/>
												Ні
											</label>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className="input-container">
						<label className="form__label">Стать</label>
						<div style={{ display: "flex" }}>
							<label>
								<input
									type="radio"
									name="gender"
									value="Жінка"
									checked={form.gender === "Жінка"}
									onChange={(e) => handleForm(e.target.name, e.target.value)}
									disabled={!editable}
								/>
								Жінка
							</label>
							<label>
								<input
									type="radio"
									name="gender"
									value="Чоловік"
									checked={form.gender === "Чоловік"}
									onChange={(e) => handleForm(e.target.name, e.target.value)}
									disabled={!editable}
								/>
								Чоловік
							</label>
						</div>
					</div>
					<div className="input-container">
						<label className="form__label" htmlFor="address">
							Адреса
						</label>
						<input
							id="address"
							className={`input ${!editable ? "input--disabled" : ""}`}
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.address}
							name="address"
							type="text"
							disabled={!editable}
						/>
					</div>
					<div className="input-container">
						<label className="form__label" htmlFor="position">
							Позиція
						</label>
						<input
							id="position"
							className={`input ${!editable ? "input--disabled" : ""}`}
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.position}
							name="position"
							type="text"
							disabled={!editable}
						/>
					</div>
					<div className={"input-container"}>
						<label className="form__label" htmlFor="message">
							Повідомлення
						</label>
						<textarea
							id="message"
							className={`textarea ${!editable ? "textarea--disabled" : ""}`}
							rows={5}
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.message}
							name="message"
							maxLength={600}
							disabled={!editable}
						/>
						<span className="input-indicator">{form.message.length} / 600</span>
					</div>
					{!editable && !isNew && (
						<div
							style={{
								display: "flex",
								gap: "5px",
								alignSelf: "flex-end",
								position: "sticky",
								bottom: "0px",
							}}
						>
							<button
								type="button"
								className="update-btn"
								onClick={() => setEditable(true)}
							>
								<EditIcon size={20} />
							</button>
							<button
								type="button"
								className="delete-btn"
								onClick={() => {
									(setDeleteModal(true), setIdToDelete(form.id));
								}}
							>
								<TrashIcon size={20} />
							</button>
						</div>
					)}

					{(editable || isNew) && (
						<div
							style={{
								alignSelf: "flex-end",
								display: "flex",
								gap: "5px",
								position: "sticky",
								bottom: "0px",
							}}
						>
							{!isNew && (
								<button
									type="button"
									className="form__cancel-btn"
									onClick={() => setEditable(false)}
								>
									Скасувати
								</button>
							)}
							<button className="form__submit-btn" type="submit">
								{formLoading
									? isNew
										? "Створення..."
										: "Збереження..."
									: isNew
										? "Створити"
										: "Змінити"}
							</button>
						</div>
					)}
				</form>
			</div>
			<div
				onClick={() => {
					setModalVisible(false);
					setDeleteModal(false);
					setIsNew(false);
					setIdToDelete("");
					setForm(EMPTY_FORM);
					setEditable(false);
				}}
				className={`main-curtain ${modalVisible || deleteModal ? "main-curtain--visible" : ""}`}
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
				<h1 className="main__title">Ліди</h1>
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
								setModalVisible(true);
								setEditable(true);
							}}
						>
							Новий лід
						</button>
					</div>
					<table>
						<thead>
							<tr>
								<th style={{ width: "1%" }}>№</th>
								<th>Ім'я</th>
								<th>
									<TelIcon />
								</th>
								<th>Мессенджери</th>
								<th>Стать</th>
								<th>Адреса</th>
								<th>Позиція</th>
								<th>Повідомлення</th>
								<th style={{ width: "1%" }}>Статус</th>
								<th style={{ width: "1%" }}>Опції</th>
							</tr>
						</thead>
						<tbody>
							{filteredLeads
								.slice((currentPage - 1) * 50, currentPage * 50)
								.map((l, i) => {
									const number = (currentPage - 1) * 50 + i + 1;

									const now = new Date();

									const diffMs =
										now.getTime() - new Date(l.created_at).getTime();

									const diffDays = diffMs / (1000 * 60 * 60 * 24);

									return (
										<tr
											key={l.id}
											className={diffDays <= 3 ? "leads-tr--new" : ""}
										>
											<td style={{ width: "1%" }}>{number}</td>
											<td style={{ width: "1%", whiteSpace: "nowrap" }}>
												{l.name}
											</td>
											<td>{l.tel}</td>
											<td>
												<div style={{ display: "flex", gap: "5px" }}>
													{l.messengers
														.filter((m) => m.isAvailable)
														.map((m, i) => (
															<img
																key={i}
																src={`${m.name}.svg`}
																width={20}
																height={20}
																alt={m.name}
															/>
														))}
													{l.messengers
														.filter((m) => !m.isAvailable)
														.map((m, i) => (
															<div
																key={m.name}
																style={{ position: "relative" }}
															>
																<img
																	key={i}
																	src={`${m.name}.svg`}
																	width={20}
																	height={20}
																	alt={m.name}
																/>
																<span
																	style={{ position: "absolute", inset: "0" }}
																>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="100%"
																		height="100%"
																		fill="red"
																		className="bi bi-x-lg"
																		viewBox="0 0 16 16"
																	>
																		<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
																	</svg>
																</span>
															</div>
														))}
												</div>
											</td>
											<td>{l.gender}</td>
											<td>{l.address}</td>
											<td>{l.position}</td>
											<td style={{ maxWidth: "200px" }}>{l.message}</td>
											<td style={{ width: "1%", whiteSpace: "nowrap" }}>
												<select
													className={`status-select ${l.status === "Знайшов роботу" ? "status-select--orange" : l.status === "Працює" ? "status-select--blue" : l.status === "Неактивний" ? "status-select--red" : ""}`}
													name="status"
													id="status"
													onChange={(e) => handleStatus(l.id, e.target.value)}
													value={l.status || ""}
												>
													<option value="Новий">Новий</option>
													<option value="Знайшов роботу">Знайшов роботу</option>
													<option value="Працює">Працює</option>
													<option value="Неактивний">Неактивний</option>
												</select>
											</td>
											<td style={{ width: "1%" }}>
												<button
													className="update-btn"
													onClick={() => {
														setForm(l);
														setModalVisible(true);
													}}
												>
													<DotsIcon size={20} />
												</button>
												{/* <div style={{ display: "flex", gap: "5px" }}>
													<button
														className="update-btn"
														onClick={() => {
															setForm(l);
															setModalVisible(true);
															setIsNew(false);
														}}
													>
														<EditIcon size={20} />
													</button>
													<button
														className="delete-btn"
														onClick={() => {
															(setDeleteModal(true), setIdToDelete(l.id));
														}}
													>
														<TrashIcon size={20} />
													</button>
												</div> */}
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
							background: "white",
							padding: "10px 0",
							marginTop: "auto",
						}}
					>
						<div style={{ display: "flex", gap: "5px" }}>
							<p
								style={{
									background: "hsl(0, 0%, 95%)",
									padding: "10px",
									borderRadius: "20px",
									fontWeight: "500",
								}}
							>
								{(currentPage - 1) * 50 + 1} -{" "}
								{Math.min(currentPage * 50, filteredLeads.length)}
							</p>
							<p
								style={{
									background: "hsl(0, 0%, 95%)",
									padding: "10px",
									borderRadius: "20px",
									fontWeight: "500",
								}}
							>
								Всього: {filteredLeads.length}
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

export default Leads;
