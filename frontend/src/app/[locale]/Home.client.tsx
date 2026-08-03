"use client";

import { useEffect, useState } from "react";
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

	useEffect(() => {
		const interval = setInterval(() => {
			setVisible(false);

			setTimeout(() => {
				setPlaceIndex((prev) => (prev + 1) % places.length);
				setVisible(true);
			}, 500); // should be the same as transition duration
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
