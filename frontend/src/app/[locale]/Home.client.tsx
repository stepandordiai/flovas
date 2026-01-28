"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import placesData from "@/app/lib/data/places-data.json";
import "./Home.scss";

const HomeClient = () => {
	const t = useTranslations();

	// FIXME:
	useEffect(() => {
		document.querySelectorAll(".blur-char").forEach((char, index) => {
			setTimeout(() => {
				char.classList.add("blur-char--active");
			}, index * 50);
		});
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
	);
};

export default HomeClient;
