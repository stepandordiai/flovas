"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import placesData from "@/app/lib/data/places-data.json";
import { Link } from "@/i18n/navigation";
import { VacancyInterface } from "../interfaces/Vacancy";
import ContactUs from "../components/ContactUs/ContactUs";
import "./Home.scss";

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
		document.querySelectorAll(".blur-char").forEach((char, index) => {
			setTimeout(() => {
				char.classList.add("blur-char--active");
			}, index * 50);
		});
	}, [text]);

	// FIXME:
	const rotateRef = useRef<HTMLDivElement | null>(null);

	function rotateWord() {
		if (!rotateRef.current) return;

		const container = rotateRef.current;
		const dataShow = container.querySelector("span[data-show]");
		const dataNext =
			dataShow?.nextElementSibling ||
			container.querySelector("span:first-child");
		const dataUp = container.querySelector("span[data-up]");

		dataUp?.removeAttribute("data-up");
		dataShow?.removeAttribute("data-show");
		dataShow?.setAttribute("data-up", "");
		dataNext?.setAttribute("data-show", "");
	}

	useEffect(() => {
		const spans = rotateRef.current?.querySelectorAll("span");
		if (!spans || spans.length === 0) return;

		spans[0].setAttribute("data-show", "");

		const interval = setInterval(rotateWord, 3000);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<ContactUs
				contactUsActive={contactUsActive}
				setContactUsActive={setContactUsActive}
			/>
			<section className="home-top">
				<div className="home__title">
					<p>
						{text.split("").map((char, index) => {
							return (
								<span key={index} className="blur-char">
									{char}
								</span>
							);
						})}
					</p>
					<div className="home__rotate-wrapper">
						<div ref={rotateRef} className="home__rotate-container">
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
									<span key={index} className="blur-char">
										{char}
									</span>
								);
							})}
					</p>
				</div>
				<div className="home__link-container">
					<button
						onClick={() => {
							setContactUsActive(true);
						}}
						className="home__link home__contact-us-link"
					>
						{t("contact_us_title")}
					</button>
					<Link className="home__link" href="/#vacancies">
						{t("vacancies_title")}
						<span className="home__link-vacancies-qty">{vacancies.length}</span>
					</Link>
				</div>
			</section>
		</>
	);
};

export default HomeClient;
