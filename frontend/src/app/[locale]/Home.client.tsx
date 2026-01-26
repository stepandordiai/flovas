"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import placesData from "@/app/lib/data/places-data.json";
import { Link } from "@/i18n/navigation";
import { VacancyInterface } from "../interfaces/Vacancy";
import styles from "./page.module.scss";
import ContactUs from "../components/ContactUs/ContactUs";

type HomeClientTypes = {
	vacancies: VacancyInterface[];
};

const HomeClient = ({ vacancies }: HomeClientTypes) => {
	const t = useTranslations();

	const [text, setText] = useState(t("home.title1"));
	const [contactUsActive, setContactUsActive] = useState(false);

	useEffect(() => {
		setText(t("home.title1"));
	}, [t]);

	// FIXME:
	useEffect(() => {
		document
			.querySelectorAll(`.${styles["blur-char"]}`)
			.forEach((char, index) => {
				setTimeout(() => {
					char.classList.add(styles["blur-char--active"]);
				}, index * 50);
			});
	}, [text]);

	function rotateWord() {
		const dataShow = document.querySelector(
			".home__rotate-container span[data-show]",
		) as HTMLSpanElement | null;
		const dataNext =
			dataShow?.nextElementSibling ||
			(document.querySelector(
				".home__rotate-container span:first-child",
			) as HTMLSpanElement | null);
		const dataUp = document.querySelector(
			".home__rotate-container span[data-up]",
		);

		if (dataUp) {
			dataUp.removeAttribute("data-up");
		}

		dataShow?.removeAttribute("data-show");
		dataShow?.setAttribute("data-up", "");
		dataNext?.setAttribute("data-show", "");
	}

	// FIXME:
	useEffect(() => {
		let customInterval: any;
		setTimeout(() => {
			const spen = document.querySelector(
				".home__rotate-container span",
			) as HTMLSpanElement | null;

			spen?.setAttribute("data-show", "");
			customInterval = setInterval(rotateWord, 3000);
		}, 1000);

		return () => {
			clearInterval(customInterval);
		};
	}, []);

	return (
		<>
			<ContactUs
				contactUsActive={contactUsActive}
				setContactUsActive={setContactUsActive}
			/>
			<section className={styles["home-top"]}>
				<div className={styles["home__title"]}>
					<p>
						{text.split("").map((char, index) => {
							return (
								<span key={index} className={styles["blur-char"]}>
									{char}
								</span>
							);
						})}
					</p>
					<div className={styles["home__rotate-wrapper"]}>
						<div className={styles["home__rotate-container"]}>
							{placesData.map((place, index) => (
								<span key={index}>{t(place)}</span>
							))}
						</div>
					</div>
					<p>
						{t("home.title2")
							.split("")
							.map((char, index) => {
								return (
									<span key={index} className={styles["blur-char"]}>
										{char}
									</span>
								);
							})}
					</p>
				</div>
				<div className={styles["home__link-container"]}>
					<button
						onClick={() => {
							setContactUsActive(true);
						}}
						className={`${styles["home__link"]} ${styles["home__contact-us-link"]}`}
					>
						{t("contact_us_title")}
					</button>
					<Link className={styles["home__link"]} href="/#vacancies">
						{t("vacancies_title")}
						<span className={styles["home__link-vacancies-qty"]}>
							{vacancies.length}
						</span>
					</Link>
				</div>
			</section>
		</>
	);
};

export default HomeClient;
