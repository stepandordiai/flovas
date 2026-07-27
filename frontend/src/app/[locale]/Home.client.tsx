"use client";

import { useEffect, useRef, useState } from "react";
import { VacancyInterface } from "@/interfaces/Vacancy";
import "./Home.scss";

export default function HomeClient({
	vacancies,
}: {
	vacancies: VacancyInterface[];
}) {
	const places = [...new Set(vacancies.map((v) => v.place))];

	const [placeIndex, setPlaceIndex] = useState(0);
	const [visible, setVisible] = useState(true);

	// FIXME:
	useEffect(() => {
		const chars = document.querySelectorAll(".blur-char");

		chars.forEach((char) => {
			char.classList.remove("blur-char--active");
		});

		requestAnimationFrame(() => {
			chars.forEach((char, index) => {
				setTimeout(() => {
					char.classList.add("blur-char--active");
				}, index * 50);
			});
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
	}, [vacancies.length]);

	useEffect(() => {
		const interval = setInterval(() => {
			setVisible(false);

			setTimeout(() => {
				setPlaceIndex((prev) => (prev + 1) % places.length);
				setVisible(true);
			}, 500); // має дорівнювати тривалості transition
		}, 3000);

		return () => clearInterval(interval);
	}, [places.length]);

	return (
		<span
			className={`hero__subheading-span ${visible ? "hero__subheading-span--visible" : ""}`}
		>
			{places[placeIndex]}
		</span>
	);
}
