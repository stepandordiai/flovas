"use client";

import { useTranslations } from "next-intl";
import socialsData from "@/app/lib/data/socialsData";
import CopyBtn from "../../CopyBtn/CopyBtn";
import { isValidTel } from "@/app/utils/validators";
import { useState } from "react";
import axios from "axios";
import classNames from "classnames";
import "./Contacts.scss";

export default function Contacts() {
	const t = useTranslations();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		tel: "",
		address: "",
		position: "",
		details: "",
	});

	// TODO: learn this
	const saveData = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isValidTel(formData.tel)) {
			return;
		}

		setLoading(true);
		setError(null);

		try {
			await axios.post(
				`https://weekly-planner-backend.onrender.com/leads`,
				formData,
			);

			setSuccess(true);

			setTimeout(() => {
				setFormData({
					name: "",
					tel: "",
					address: "",
					position: "",
					details: "",
				});
				setSuccess(false);
			}, 3000);
		} catch (err: any) {
			setError(err.response?.data?.message);
		} finally {
			setLoading(false);
		}
	};

	const handleForm = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<section className="contacts" id="contacts">
			<h2 className="contacts__title">{t("contacts_title")}</h2>
			<div className="contacts__inner">
				<div className="contacts-container">
					<h3 className="contacts__details-title">{t("contact_info")}</h3>
					<div className="contacts__details-container">
						<p>{t("tel")}</p>
						<a href="tel:+420777957290">+420 777 957 290</a>
						<p>Email</p>
						<a href="mailto:info@neresen.cz">info@neresen.cz</a>
						<p>{t("address")}</p>
						<a href="https://maps.app.goo.gl/BfeYpMKrLn5XpkmCA">
							Pod Hroby 271 Kolín IV
						</a>
						<p>IČO</p>
						<CopyBtn />
					</div>
					<h3>
						Підписуйтесь на наші соціальні мережі, щоб не пропустити нові
						вакансії в Чехії.
					</h3>
					<div className="contacts__socials-container">
						{socialsData.map((social) => {
							const Icon = social.socialImg;
							return (
								<a
									key={social.id}
									href={social.socialUrl}
									target="_blank"
									title={social.title}
								>
									<Icon size={40} />
								</a>
							);
						})}
					</div>
					<h3>{t("map_title")}</h3>
					<iframe
						className="map"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d329.5935177795711!2d15.214144089939822!3d50.02410476646222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470c1551f5cf6ff7%3A0xf2d6322ddcdffd0!2sflovas%20s.r.o.!5e1!3m2!1sen!2scz!4v1752502315664!5m2!1sen!2scz"
						title="flovas agency location on Google Maps"
						loading="lazy"
					></iframe>
				</div>
				<div className="contacts-container">
					<h3 className="contacts__details-title">{t("contacts.contactUs")}</h3>
					<form className="contacts-form" onSubmit={saveData}>
						<div className="input-container">
							<label className="label" htmlFor="name">
								{t("contacts.name")}
							</label>
							<input
								onChange={(e) => handleForm(e.target.name, e.target.value)}
								name="name"
								value={formData.name}
								className="contacts__input"
								type="text"
								id="name"
								autoComplete="given-name"
							/>
						</div>
						<div className="input-container">
							<label className="label" htmlFor="tel">
								{t("tel")}
							</label>
							<input
								onChange={(e) => handleForm(e.target.name, e.target.value)}
								name="tel"
								value={formData.tel}
								className="contacts__input"
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
								onChange={(e) => handleForm(e.target.name, e.target.value)}
								name="address"
								value={formData.address}
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
								onChange={(e) => handleForm(e.target.name, e.target.value)}
								name="position"
								value={formData.position}
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
								onChange={(e) => handleForm(e.target.name, e.target.value)}
								name="details"
								value={formData.details}
								className="contacts__input"
								id="details"
							></textarea>
						</div>
						<button
							className={classNames("contacts-form__btn", {
								"contacts-form__btn--loading": loading,
								"contacts-form__btn--success": success,
								"contacts-form__btn--error": error,
							})}
							type="submit"
							disabled={loading || success}
						>
							{loading
								? t("loading")
								: success
									? t("success")
									: error
										? error
										: t("send")}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
