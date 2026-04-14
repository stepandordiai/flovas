"use client";

import { useTranslations } from "next-intl";
import { isValidTel } from "@/utils/validators";
import { useState } from "react";
import axios from "axios";
import classNames from "classnames";

const initContactsForm = {
	name: "",
	tel: "",
	address: "",
	position: "",
	details: "",
};

export default function ContactsClient() {
	const t = useTranslations();

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [contactsForm, setContactsForm] = useState(initContactsForm);

	const createContactsLead = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (!isValidTel(contactsForm.tel)) {
			setError("Некорректний номер телефону");
			return;
		}

		setLoading(true);

		try {
			await axios.post(
				`https://weekly-planner-backend.onrender.com/leads`,
				contactsForm,
			);

			setSuccess(true);
			setContactsForm(initContactsForm);
			setTimeout(() => {
				setSuccess(false);
			}, 3000);
		} catch (err: any) {
			if (err.response?.status !== 409) {
				setError(err.response?.data?.message);
				setLoading(false);
				return;
			}
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
					{t("tel")} *
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
				<label className="label" htmlFor="details">
					{t("contacts.message")}
				</label>
				<textarea
					onChange={(e) => handleContactsForm(e.target.name, e.target.value)}
					name="details"
					value={contactsForm.details}
					className="contacts__input"
					id="details"
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
