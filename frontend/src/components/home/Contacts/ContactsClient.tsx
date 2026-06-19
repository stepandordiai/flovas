"use client";

import { useTranslations } from "next-intl";
import { isValidTel } from "@/utils/validators";
import { useState } from "react";
import classNames from "classnames";
import { supabase, supabaseF } from "@/lib/supabase";

const initContactsForm = {
	name: "",
	tel: "",
	address: "",
	position: "",
	message: "",
};

export default function ContactsClient() {
	const t = useTranslations();

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [contactsForm, setContactsForm] = useState(initContactsForm);

	// TODO: !
	const createContactsLead = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (!isValidTel(contactsForm.tel)) {
			setError("Некорректний номер телефону");
			return;
		}

		setLoading(true);

		try {
			const { error } = await supabase.from("leads").insert([contactsForm]);
			const { error: errorF } = await supabaseF
				.from("leads")
				.insert([contactsForm]);

			// handle unexpected errors
			// TODO: 23505 - supabase dublicate
			if (
				(error && error.code !== "23505") ||
				(errorF && errorF.code !== "23505")
			) {
				setError("Помилка при створенні ліда");
				return;
			}

			// TODO: LEARN THIS
			fetch("/api/notify-lead", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(contactsForm),
			}).catch(() => {});

			setSuccess(true);
			setContactsForm(initContactsForm);
			setTimeout(() => setSuccess(false), 3000);
		} finally {
			setLoading(false);
		}
	};

	const handleContactsForm = (name: string, value: string) => {
		setContactsForm((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<form className="contacts-form" onSubmit={createContactsLead}>
			{/* {error && !isValidTel(formData.tel) && formData.tel !== "" && (
							<span style={{ color: "rgb(255, 115, 115)" }}>{error}</span>
						)} */}
			{error && <span style={{ color: "rgb(255, 115, 115)" }}>{error}</span>}
			<div className="input-container">
				<label className="label" htmlFor="name">
					{t("contacts.name")}
				</label>
				<input
					onChange={(e) => handleContactsForm(e.target.name, e.target.value)}
					name="name"
					value={contactsForm.name}
					className="contacts__input"
					type="text"
					id="name"
					autoComplete="given-name"
				/>
			</div>
			<div className="input-container">
				<label className="label" htmlFor="tel">
					{t("tel")}
					<span style={{ color: "rgb(255, 115, 115)" }}>*</span>
				</label>
				<input
					onChange={(e) => handleContactsForm(e.target.name, e.target.value)}
					name="tel"
					value={contactsForm.tel}
					className={classNames("contacts__input", {
						"contacts__input--incorrect":
							error && !isValidTel(contactsForm.tel) && contactsForm.tel !== "",
					})}
					type="tel"
					id="tel"
					autoComplete="tel"
					required
				/>
			</div>
			<div className="input-container">
				<label className="label" htmlFor="address">
					{t("contacts.address")}
				</label>
				<input
					onChange={(e) => handleContactsForm(e.target.name, e.target.value)}
					name="address"
					value={contactsForm.address}
					className="contacts__input"
					type="text"
					id="address"
				/>
			</div>
			<div className="input-container">
				<label className="label" htmlFor="position">
					{t("contacts.position")}
				</label>
				<input
					onChange={(e) => handleContactsForm(e.target.name, e.target.value)}
					name="position"
					value={contactsForm.position}
					className="contacts__input"
					type="text"
					id="position"
				/>
			</div>
			<div className="input-container">
				<label className="label" htmlFor="message">
					{t("contacts.message")}
				</label>
				<textarea
					onChange={(e) => handleContactsForm(e.target.name, e.target.value)}
					name="message"
					value={contactsForm.message}
					className="contacts__input"
					id="message"
					rows={3}
				></textarea>
			</div>
			<button
				className={classNames("contacts-form__btn", {
					"contacts-form__btn--loading": loading,
					"contacts-form__btn--success": success,
				})}
				type="submit"
				disabled={loading || success}
			>
				{loading ? t("loading") : success ? t("success") : t("send")}
			</button>
		</form>
	);
}
