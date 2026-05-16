import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";
import EditIcon from "../../components/icons/EditIcon";
import TrashIcon from "../../components/icons/TrashIcon";
import "./styles.scss";

const EMPTY_FORM = {
	id: "",
	name: "",
	tel: "",
	address: "",
	position: "",
	message: "",
	is_working: false,
};

interface Lead {
	id: string;
	name: string;
	tel: string;
	address: string;
	position: string;
	message: string;
	is_working: boolean;
	created_at: Date;
}

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

	// TODO: learn this
	const filteredLeads = leads.filter((lead) =>
		Object.values(lead).some((value) =>
			String(value).toLowerCase().includes(filter.toLowerCase()),
		),
	);
	const [currentPage, setCurrentPage] = useState(1);

	const handleForm = (name: string, value: string) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	useEffect(() => {
		document.documentElement.scrollTo(0, 0);
	}, [currentPage]);

	const insertLead = async (data: Lead) => {
		setError(null);
		const { id, ...rest } = data;
		const { error } = await supabase.from("leads").insert([rest]);
		if (error) {
			if (error.code === "23505") setError("Лід з таким номером вже існує");
			else console.error("Insert error:", error.message);
			return false;
		}
		return true;
	};

	const updateOne = async (id: string, data: Lead) =>
		supabase.from("leads").update(data).eq("id", id);

	// FIXME:
	const handleSave = async (form: any) => {
		if (isNew) {
			const ok = await insertLead(form);
			if (!ok) return;
		} else {
			await updateOne(form.id, form);
		}
		setForm(EMPTY_FORM);
		setIsNew(false);
		setModalVisible(false);
		await load();
	};

	const handleDelete = () => {
		deleteOne(idToDelete);
		setIdToDelete("");
		setDeleteModal(false);
	};

	const deleteOne = async (id: string) => {
		const { error } = await supabase.from("leads").delete().eq("id", id);
		if (error) console.error("Delete error:", error.message);
		else load();
	};

	const toggleIsWorking = async (id: string, value: boolean) =>
		supabase.from("leads").update({ is_working: value }).eq("id", id);

	const handleToggleIsWorking = async (id: string, current: boolean) => {
		await toggleIsWorking(id, !current);
		setLeads((prev) =>
			prev.map((v) => (v.id === id ? { ...v, is_working: !current } : v)),
		);
	};

	const totalPages = Math.ceil(leads.length / 50);

	return (
		<>
			<div className={`modal ${modalVisible ? "modal--visible" : ""}`}>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<p className="form__title">
						{isNew ? "Створити лід" : "Змінити лід"}
					</p>
					<button
						className="close-btn"
						onClick={() => {
							setModalVisible(false);
							setForm(EMPTY_FORM);
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
				{error && <p style={{ color: "red" }}>{error}</p>}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSave(form);
					}}
				>
					<div className="input-container">
						<label htmlFor="">Імя</label>
						<input
							className="input"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.name}
							name="name"
							type="text"
						/>
					</div>
					<div className="input-container">
						<label htmlFor="">Номер телефону</label>
						<input
							className="input"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.tel}
							name="tel"
							type="text"
						/>
					</div>
					<div className="input-container">
						<label htmlFor="">Адреса</label>
						<input
							className="input"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.address}
							name="address"
							type="text"
						/>
					</div>
					<div className="input-container">
						<label htmlFor="">Позиція</label>
						<input
							className="input"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.position}
							name="position"
							type="text"
						/>
					</div>
					<div className="input-container">
						<label htmlFor="">Повідомлення</label>
						<input
							className="input"
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.message}
							name="message"
							type="text"
						/>
					</div>
					<button className="form__submit-btn" type="submit">
						{isNew ? "Створити" : "Змінити"}
					</button>
				</form>
			</div>
			<div
				onClick={() => {
					setModalVisible(false);
					setDeleteModal(false);
					setIsNew(false);
					setIdToDelete("");
					setForm(EMPTY_FORM);
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
			<div className="layout">
				<main className="main">
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<h1 className="main__title">Ліди</h1>
					</div>
					<div className="container">
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
									<th>Номер телефону</th>
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
											<tr key={l.id} className="leads-tr">
												<td style={{ width: "1%" }}>{number}</td>
												<td style={{ width: "1%", whiteSpace: "nowrap" }}>
													{l.name}{" "}
													{diffDays <= 3 && (
														<span
															style={{
																background: "var(--sec-accent-clr)",
																padding: "5px",
															}}
														>
															Новий
														</span>
													)}
												</td>
												<td>{l.tel}</td>
												<td>{l.address}</td>
												<td>{l.position}</td>
												<td style={{ maxWidth: "200px" }}>{l.message}</td>
												<td style={{ width: "1%", whiteSpace: "nowrap" }}>
													<button
														onClick={() =>
															handleToggleIsWorking(l.id, l.is_working)
														}
														className={`status-btn ${!l.is_working ? "status-btn--inactive" : ""}`}
													>
														{l.is_working ? "Працює" : "Не працює"}
													</button>
												</td>
												<td style={{ width: "1%" }}>
													<div style={{ display: "flex", gap: "5px" }}>
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
									{Math.min(currentPage * 50, filteredLeads.length)}
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
									Всього: {filteredLeads.length}
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
			</div>
		</>
	);
};

export default Leads;
