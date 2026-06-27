"use client";

import { useTranslations } from "next-intl";
import { isValidTel } from "@/utils/validators";
import { useState } from "react";
import classNames from "classnames";
import { supabase, supabaseF } from "@/lib/supabase";
import "./styles.scss";

const INIT_FORM = {
	name: "",
	tel: "",
	address: "",
	position: "",
	message: "",
};

export default function ContactUsForm() {
	const t = useTranslations();

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [form, setForm] = useState(INIT_FORM);

	// TODO: !
	const createContactsLead = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (!isValidTel(form.tel)) {
			setError("Некорректний номер телефону");
			return;
		}

		setLoading(true);

		try {
			const { error } = await supabase.from("leads").insert([form]);
			const { error: errorF } = await supabaseF.from("leads").insert([form]);

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
				body: JSON.stringify(form),
			}).catch(() => {});

			setSuccess(true);
			setForm(INIT_FORM);
			setTimeout(() => setSuccess(false), 3000);
		} finally {
			setLoading(false);
		}
	};

	const handleContactsForm = (name: string, value: string) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="contact-us" id="contact-us">
			<h3 className="contact-us__heading">{t("contacts.contactUs")}</h3>
			<p>Заповніть форму, і ми зв’яжемося з вами найближчим часом.</p>
			<form className="contact-us-form" onSubmit={createContactsLead}>
				{error && <span style={{ color: "rgb(255, 115, 115)" }}>{error}</span>}
				<div className="input-container">
					<label className="label" htmlFor="name">
						{t("contacts.name")}
					</label>
					<input
						onChange={(e) => handleContactsForm(e.target.name, e.target.value)}
						name="name"
						value={form.name}
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
						value={form.tel}
						className={classNames("contacts__input", {
							"contacts__input--incorrect":
								error && !isValidTel(form.tel) && form.tel !== "",
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
						value={form.address}
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
						value={form.position}
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
						value={form.message}
						className="contacts__input"
						id="message"
						rows={9}
						maxLength={600}
					></textarea>
					<span className="input-indicator">{form.message.length} / 600</span>
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
		</div>
	);
}
