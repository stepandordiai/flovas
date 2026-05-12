import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";
import "./styles.scss";

const EMPTY_FORM = {
	id: "",
	name: "",
	tel: "",
	address: "",
	position: "",
	message: "",
};

interface Lead {
	id: string;
	name: string;
	tel: string;
	address: string;
	position: string;
	message: string;
}

const Leads = () => {
	const [leads, setLeads] = useState<Lead[]>([]);
	const [isNew, setIsNew] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [form, setForm] = useState(EMPTY_FORM);
	const [error, setError] = useState<null | string>(null);
	const [filter, setFilter] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const handleForm = (name: string, value: string) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const getAll = async () => supabase.from("leads").select("*");
	// .order("created_at", { ascending: false });

	const load = async () => {
		const { data } = await getAll();
		setLeads(data ?? []);
	};

	useEffect(() => {
		load();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [currentPage]);

	console.log(leads);

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

	const handleSave = async (form: Lead) => {
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

	const deleteOne = async (id: string) => {
		const { error } = await supabase.from("leads").delete().eq("id", id);
		if (error) console.error("Delete error:", error.message);
		else load(); // refresh list
	};

	const totalPages = Math.ceil(leads.length / 50);

	return (
		<>
			<div className={`modal ${modalVisible ? "modal--visible" : ""}`}>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<p className="form__title">Створити ліда</p>
					<button className="close-btn" onClick={() => setModalVisible(false)}>
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
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.name}
							name="name"
							type="text"
						/>
					</div>
					<div className="input-container">
						<label htmlFor="">Номер телефону</label>
						<input
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.tel}
							name="tel"
							type="text"
						/>
					</div>
					<div className="input-container">
						<label htmlFor="">Адреса</label>
						<input
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.address}
							name="address"
							type="text"
						/>
					</div>
					<div className="input-container">
						<label htmlFor="">Позиція</label>
						<input
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.position}
							name="position"
							type="text"
						/>
					</div>
					<div className="input-container">
						<label htmlFor="">Повідомлення</label>
						<input
							onChange={(e) => handleForm(e.target.name, e.target.value)}
							value={form.message}
							name="message"
							type="text"
						/>
					</div>
					<button className="form__submit-btn" type="submit">
						Створити
					</button>
				</form>
			</div>
			<div className="layout">
				<main className="main">
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<h1 className="main__title">Ліди</h1>
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
					<div className="container">
						<input
							onChange={(e) => setFilter(e.target.value)}
							value={filter}
							type="text"
							placeholder="Search"
						/>
						<table>
							<thead>
								<tr>
									<th>№</th>
									<th>Ім'я</th>
									<th>Номер телефону</th>
									<th>Адреса</th>
									<th>Позиція</th>
									<th>Повідомлення</th>
									<th>Опції</th>
								</tr>
							</thead>
							<tbody>
								{leads
									.filter((l) => l.tel.includes(filter))
									.slice((currentPage - 1) * 50, currentPage * 50)
									.map((l, i) => {
										const number = (currentPage - 1) * 50 + i + 1;

										return (
											<tr key={l.id}>
												<td>{number}</td>
												<td>{l.name}</td>
												<td>{l.tel}</td>
												<td>{l.address}</td>
												<td>{l.position}</td>
												<td style={{ maxWidth: "200px" }}>{l.message}</td>
												<td>
													<div style={{ display: "flex", gap: "5px" }}>
														<button
															className="update-btn"
															onClick={() => {
																setForm(l);
																setModalVisible(true);
																setIsNew(false);
															}}
														>
															Edit
														</button>
														<button
															className="delete-btn"
															onClick={() => deleteOne(l.id)}
														>
															X
														</button>
													</div>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<p>
								{(currentPage - 1) * 50 + 1} -{" "}
								{Math.min(currentPage * 50, leads.length)} of {leads.length}
							</p>
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
