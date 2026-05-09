"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────
type Vacancy = {
	id: string;
	img: string;
	is_active: boolean;
	created_at: string;
	place: string;
	address: string;
	address_url: string;
	title: string;
	salary: number;
	description: string[];
	requirements: string[];
	responsibilities: string[];
	job_type: string;
};

type FormData = Omit<Vacancy, "created_at"> & { created_at: string };

const EMPTY_FORM: FormData = {
	id: "",
	img: "",
	is_active: true,
	created_at: new Date().toISOString().slice(0, 10),
	place: "",
	address: "",
	address_url: "",
	title: "",
	salary: 0,
	description: [],
	requirements: [],
	responsibilities: [],
	job_type: "",
};

// ─── Supabase helpers ─────────────────────────────────────
const getAll = async () =>
	supabase.from("vacancies").select("*").order("created_at", { ascending: false });

const insertOne = async (data: FormData) =>
	supabase.from("vacancies").insert([data]);

const updateOne = async (id: string, data: Partial<FormData>) =>
	supabase.from("vacancies").update(data).eq("id", id);

const deleteOne = async (id: string) =>
	supabase.from("vacancies").delete().eq("id", id);

const toggleActive = async (id: string, value: boolean) =>
	supabase.from("vacancies").update({ is_active: value }).eq("id", id);

// ─── Array field editor ───────────────────────────────────
function ArrayField({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string[];
	onChange: (v: string[]) => void;
}) {
	const update = (i: number, val: string) => {
		const next = [...value];
		next[i] = val;
		onChange(next);
	};
	const add = () => onChange([...value, ""]);
	const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

	return (
		<div className="array-field">
			<label>{label}</label>
			{value.map((item, i) => (
				<div key={i} className="array-row">
					<input
						value={item}
						onChange={(e) => update(i, e.target.value)}
						placeholder={`${label} ${i + 1}`}
					/>
					<button type="button" className="btn-remove" onClick={() => remove(i)}>
						✕
					</button>
				</div>
			))}
			<button type="button" className="btn-add" onClick={add}>
				+ Add {label}
			</button>
		</div>
	);
}

// ─── Modal ────────────────────────────────────────────────
function Modal({
	vacancy,
	onClose,
	onSave,
}: {
	vacancy: FormData | null;
	onClose: () => void;
	onSave: (data: FormData) => Promise<void>;
}) {
	const [form, setForm] = useState<FormData>(vacancy ?? EMPTY_FORM);
	const [saving, setSaving] = useState(false);

	const set = (key: keyof FormData, val: unknown) =>
		setForm((prev) => ({ ...prev, [key]: val }));

	const handleSubmit = async () => {
		setSaving(true);
		await onSave(form);
		setSaving(false);
	};

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<div className="modal-header">
					<h2>{vacancy?.id ? "Edit Vacancy" : "New Vacancy"}</h2>
					<button className="modal-close" onClick={onClose}>✕</button>
				</div>

				<div className="modal-body">
					<div className="form-grid">
						<div className="form-group full">
							<label>ID (slug)</label>
							<input
								value={form.id}
								onChange={(e) => set("id", e.target.value)}
								placeholder="uklizecka-pardubice-panasonic"
								disabled={!!vacancy?.id}
							/>
						</div>

						<div className="form-group full">
							<label>Title</label>
							<input
								value={form.title}
								onChange={(e) => set("title", e.target.value)}
								placeholder="Потрібні прибиральниці..."
							/>
						</div>

						<div className="form-group">
							<label>Place</label>
							<input
								value={form.place}
								onChange={(e) => set("place", e.target.value)}
								placeholder="Прага"
							/>
						</div>

						<div className="form-group">
							<label>Salary (CZK/hr)</label>
							<input
								type="number"
								value={form.salary}
								onChange={(e) => set("salary", Number(e.target.value))}
							/>
						</div>

						<div className="form-group">
							<label>Job Type</label>
							<input
								value={form.job_type}
								onChange={(e) => set("job_type", e.target.value)}
								placeholder="Прибирання"
							/>
						</div>

						<div className="form-group">
							<label>Created At</label>
							<input
								type="date"
								value={form.created_at}
								onChange={(e) => set("created_at", e.target.value)}
							/>
						</div>

						<div className="form-group full">
							<label>Address</label>
							<input
								value={form.address}
								onChange={(e) => set("address", e.target.value)}
								placeholder="Jinonická 1317/1, Praha 5"
							/>
						</div>

						<div className="form-group full">
							<label>Address URL (Google Maps)</label>
							<input
								value={form.address_url}
								onChange={(e) => set("address_url", e.target.value)}
								placeholder="https://maps.app.goo.gl/..."
							/>
						</div>

						<div className="form-group full">
							<label>Image path</label>
							<input
								value={form.img}
								onChange={(e) => set("img", e.target.value)}
								placeholder="/vacancies/my-vacancy-c.png"
							/>
						</div>

						<div className="form-group toggle-group">
							<label>Active</label>
							<button
								type="button"
								className={`toggle ${form.is_active ? "on" : "off"}`}
								onClick={() => set("is_active", !form.is_active)}
							>
								{form.is_active ? "Active" : "Inactive"}
							</button>
						</div>
					</div>

					<ArrayField
						label="Description"
						value={form.description}
						onChange={(v) => set("description", v)}
					/>
					<ArrayField
						label="Requirements"
						value={form.requirements}
						onChange={(v) => set("requirements", v)}
					/>
					<ArrayField
						label="Responsibilities"
						value={form.responsibilities}
						onChange={(v) => set("responsibilities", v)}
					/>
				</div>

				<div className="modal-footer">
					<button className="btn btn-ghost" onClick={onClose}>Cancel</button>
					<button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
						{saving ? "Saving…" : "Save Vacancy"}
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── Main Admin Component ─────────────────────────────────
export default function VacanciesAdmin() {
	const [vacancies, setVacancies] = useState<Vacancy[]>([]);
	const [loading, setLoading] = useState(true);
	const [editing, setEditing] = useState<FormData | null>(null);
	const [isNew, setIsNew] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [search, setSearch] = useState("");

	const load = async () => {
		setLoading(true);
		const { data } = await getAll();
		setVacancies(data ?? []);
		setLoading(false);
	};

	useEffect(() => { load(); }, []);

	const handleSave = async (form: FormData) => {
		if (isNew) {
			await insertOne(form);
		} else {
			await updateOne(form.id, form);
		}
		setEditing(null);
		setIsNew(false);
		await load();
	};

	const handleDelete = async () => {
		if (!deleteId) return;
		await deleteOne(deleteId);
		setDeleteId(null);
		await load();
	};

	const handleToggle = async (id: string, current: boolean) => {
		await toggleActive(id, !current);
		setVacancies((prev) =>
			prev.map((v) => (v.id === id ? { ...v, is_active: !current } : v))
		);
	};

	const filtered = vacancies.filter((v) =>
		v.title.toLowerCase().includes(search.toLowerCase()) ||
		v.place.toLowerCase().includes(search.toLowerCase()) ||
		v.job_type.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<>
			<style>{styles}</style>
			<div className="admin-wrap">
				<div className="admin-header">
					<div>
						<h1>Vacancies</h1>
						<span className="count">{vacancies.length} total</span>
					</div>
					<button
						className="btn btn-primary"
						onClick={() => { setEditing(EMPTY_FORM); setIsNew(true); }}
					>
						+ New Vacancy
					</button>
				</div>

				<div className="toolbar">
					<input
						className="search"
						placeholder="Search by title, place, type…"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				{loading ? (
					<div className="loading">Loading…</div>
				) : (
					<div className="table-wrap">
						<table>
							<thead>
								<tr>
									<th>Status</th>
									<th>Title</th>
									<th>Place</th>
									<th>Type</th>
									<th>Salary</th>
									<th>Created</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{filtered.map((v) => (
									<tr key={v.id} className={v.is_active ? "" : "inactive-row"}>
										<td>
											<button
												className={`badge ${v.is_active ? "badge-active" : "badge-inactive"}`}
												onClick={() => handleToggle(v.id, v.is_active)}
												title="Toggle active"
											>
												{v.is_active ? "Active" : "Inactive"}
											</button>
										</td>
										<td className="title-cell">{v.title}</td>
										<td>{v.place}</td>
										<td>{v.job_type}</td>
										<td>{v.salary} Kč</td>
										<td>{v.created_at}</td>
										<td>
											<div className="actions">
												<button
													className="btn-icon"
													title="Edit"
													onClick={() => { setEditing(v as FormData); setIsNew(false); }}
												>
													✏️
												</button>
												<button
													className="btn-icon btn-icon-danger"
													title="Delete"
													onClick={() => setDeleteId(v.id)}
												>
													🗑️
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						{filtered.length === 0 && (
							<div className="empty">No vacancies found</div>
						)}
					</div>
				)}
			</div>

			{/* Edit / Create Modal */}
			{editing && (
				<Modal
					vacancy={editing}
					onClose={() => { setEditing(null); setIsNew(false); }}
					onSave={handleSave}
				/>
			)}

			{/* Delete Confirm */}
			{deleteId && (
				<div className="modal-overlay" onClick={() => setDeleteId(null)}>
					<div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
						<h3>Delete vacancy?</h3>
						<p>This cannot be undone.</p>
						<div className="confirm-actions">
							<button className="btn btn-ghost" onClick={() => setDeleteId(null)}>Cancel</button>
							<button className="btn btn-danger" onClick={handleDelete}>Delete</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

// ─── Styles ───────────────────────────────────────────────
const styles = `
  .admin-wrap {
    font-family: 'Inter', system-ui, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 24px;
    color: #0f172a;
  }

  .admin-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .admin-header h1 {
    font-size: 28px;
    font-weight: 700;
    color: #1a2540;
    margin-bottom: 2px;
  }

  .count {
    font-size: 13px;
    color: #64748b;
  }

  .toolbar {
    margin-bottom: 20px;
  }

  .search {
    width: 100%;
    max-width: 380px;
    padding: 10px 14px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.15s;
  }

  .search:focus { border-color: #1a2540; }

  .table-wrap {
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    overflow: hidden;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  thead tr {
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    padding: 12px 16px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #64748b;
  }

  td {
    padding: 14px 16px;
    border-bottom: 1px solid #f1f5f9;
    vertical-align: middle;
  }

  tbody tr:last-child td { border-bottom: none; }

  tbody tr:hover { background: #f8fafc; }

  .inactive-row { opacity: 0.55; }

  .title-cell {
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
  }

  .badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 99px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: opacity 0.15s;
  }

  .badge:hover { opacity: 0.8; }
  .badge-active { background: #dcfce7; color: #16a34a; }
  .badge-inactive { background: #fee2e2; color: #dc2626; }

  .actions { display: flex; gap: 6px; }

  .btn-icon {
    background: none;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 5px 8px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.15s;
  }

  .btn-icon:hover { background: #f1f5f9; }
  .btn-icon-danger:hover { background: #fee2e2; border-color: #fca5a5; }

  .empty, .loading {
    text-align: center;
    padding: 48px;
    color: #94a3b8;
    font-size: 15px;
  }

  /* Buttons */
  .btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.15s;
  }

  .btn-primary {
    background: #1a2540;
    color: #fff;
  }

  .btn-primary:hover { background: #243160; }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

  .btn-ghost {
    background: transparent;
    color: #64748b;
    border: 1px solid #e2e8f0;
  }

  .btn-ghost:hover { background: #f8fafc; }

  .btn-danger {
    background: #dc2626;
    color: #fff;
  }

  .btn-danger:hover { background: #b91c1c; }

  /* Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 24px;
  }

  .modal {
    background: #fff;
    border-radius: 12px;
    width: 100%;
    max-width: 680px;
    max-height: 88vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid #e2e8f0;
  }

  .modal-header h2 {
    font-size: 18px;
    font-weight: 700;
    color: #1a2540;
  }

  .modal-close {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #94a3b8;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .modal-close:hover { background: #f1f5f9; color: #1a2540; }

  .modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .form-group { display: flex; flex-direction: column; gap: 5px; }
  .form-group.full { grid-column: 1 / -1; }

  .form-group label {
    font-size: 12px;
    font-weight: 600;
    color: #374151;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .form-group input, .form-group select {
    padding: 9px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 7px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.15s;
    background: #fff;
  }

  .form-group input:focus { border-color: #1a2540; }
  .form-group input:disabled { background: #f8fafc; color: #64748b; }

  /* Toggle */
  .toggle-group { justify-content: flex-start; }

  .toggle {
    padding: 8px 20px;
    border-radius: 99px;
    border: none;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
  }

  .toggle.on { background: #dcfce7; color: #16a34a; }
  .toggle.off { background: #fee2e2; color: #dc2626; }

  /* Array fields */
  .array-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .array-field > label {
    font-size: 12px;
    font-weight: 600;
    color: #374151;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .array-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .array-row input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 7px;
    font-size: 14px;
    outline: none;
  }

  .array-row input:focus { border-color: #1a2540; }

  .btn-remove {
    background: none;
    border: 1px solid #fca5a5;
    color: #dc2626;
    border-radius: 6px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    font-size: 12px;
    flex-shrink: 0;
    transition: background 0.15s;
  }

  .btn-remove:hover { background: #fee2e2; }

  .btn-add {
    align-self: flex-start;
    background: none;
    border: 1px dashed #cbd5e1;
    color: #64748b;
    border-radius: 7px;
    padding: 7px 14px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .btn-add:hover { border-color: #1a2540; color: #1a2540; background: #f8fafc; }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 16px 24px;
    border-top: 1px solid #e2e8f0;
    background: #f8fafc;
  }

  /* Confirm modal */
  .confirm-modal {
    background: #fff;
    border-radius: 12px;
    padding: 28px;
    max-width: 360px;
    width: 100%;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  }

  .confirm-modal h3 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #1a2540;
  }

  .confirm-modal p {
    color: #64748b;
    font-size: 14px;
    margin-bottom: 24px;
  }

  .confirm-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
`;
