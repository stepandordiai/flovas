"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import placesData from "@/app/lib/data/places-data.json";
import { Link } from "@/i18n/navigation";
import { fetchVacancies } from "../lib/api/vacancies";
import { VacancyInterface } from "../interfaces/Vacancy";
import Vacancy from "../components/Vacancy/Vacancy";
import "./Home.scss";

const HomeClient = () => {
	const t = useTranslations();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [vacancies, setVacancies] = useState<VacancyInterface[]>([]);

	// FIXME:
	useEffect(() => {
		document.querySelectorAll(".blur-char").forEach((char, index) => {
			setTimeout(() => {
				char.classList.add("blur-char--active");
			}, index * 50);
		});
	}, []);

	useEffect(() => {
		fetchVacancies()
			.then(setVacancies)
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

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
		<div className="home-inner-container">
			<section className="home-top">
				<div className="home__title">
					<p>
						{t("home.title1")
							.split("")
							.map((char, index) => {
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
					<Link className="home__link" href="/#contacts">
						{t("contact_us_title")}
					</Link>
					<Link className="home__link" href="/#vacancies">
						{t("vacancies_title")}
						<span className="home__link-vacancies-qty">{vacancies.length}</span>
					</Link>
				</div>
			</section>
			<section className="vacancies" id="vacancies">
				<h2 className="vacancies__title">{t("vacancies_title")}</h2>
				{/* <Suspense
					fallback={
						<VacanciesLoading
							text={`${t("vacancies_r_loading")}. (~30 ${t("sec")}.)`}
						/>
					}
				> */}
				<div className="vacancies-container">
					{vacancies
						.slice()
						.reverse()
						.map((vacancy, index) => (
							<Vacancy key={index} vacancy={vacancy} />
						))}
				</div>
				{/* </Suspense> */}
			</section>
		</div>
	);
};

export default HomeClient;
