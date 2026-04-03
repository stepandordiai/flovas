"use client";

import { useTranslations } from "next-intl";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import Vacancy from "@/components/Vacancy/Vacancy";
import vacancies from "@/data/vacancies.json";
import ScrollToTopBtn from "@/components/ScrollToTopBtn/ScrollToTopBtn";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";
import { VacancyInterface } from "@/interfaces/Vacancy";

export default function VacanciesClient() {
	const t = useTranslations();
	const [placeFilter, setPlaceFilter] = useState("");

	const filteredVacancies = vacancies.filter((vacancy) =>
		placeFilter ? placeFilter === vacancy.place : true,
	);

	const [filterVisible, setFilterVisible] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [placeFilter]);

	const VacanciesModal = ({
		filterVisible,
		placeFilter,
		setPlaceFilter,
		setFilterVisible,
	}: {
		filterVisible: boolean;
		placeFilter: string;
		setPlaceFilter: (v: string) => void;
		setFilterVisible: (v: boolean) => void;
	}) => {
		const [mounted, setMounted] = useState(false);
		useEffect(() => {
			setMounted(true);
		}, []);
		if (!mounted) return null;

		return createPortal(
			<>
				<div
					className={classNames("modal-filter", {
						"modal-filter--visible": filterVisible,
					})}
				>
					<div className="lng-select-banner__header">
						<p className="lng-select-banner__title">Фільтрувати вакансії</p>
						<button onClick={() => setFilterVisible(false)}>
							{t("close")}
						</button>
					</div>
					<div className="modal-filter-inner">
						<div style={{ display: "flex", flexDirection: "column" }}>
							<label htmlFor="place-select">Місто</label>
							<select
								id="place-select"
								className="input"
								onChange={(e) => setPlaceFilter(e.target.value)}
								value={placeFilter}
							>
								<option value="">Всі міста</option>
								{uniquePlaces.map((place, i) => (
									<option key={i} value={place}>
										{place}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<div
					onClick={() => setFilterVisible(false)}
					className={classNames("lng-select__curtain", {
						"lng-select__curtain--active": filterVisible,
					})}
				></div>
			</>,
			document.body,
		);
	};

	const uniquePlaces = [...new Set(vacancies.map((vacancy) => vacancy.place))];

	return (
		<>
			<VacanciesModal
				filterVisible={filterVisible}
				placeFilter={placeFilter}
				setPlaceFilter={setPlaceFilter}
				setFilterVisible={setFilterVisible}
			/>
			<div className="vacancies-filter">
				<div className="vacancies-filter-inner">
					<p className="lng-select-banner__title">Фільтри</p>
					<div>
						<label htmlFor="">Місто</label>
						<select
							className="input"
							onChange={(e) => setPlaceFilter(e.target.value)}
							value={placeFilter}
						>
							<option value="">Всі міста</option>
							{uniquePlaces.map((place, i) => {
								return (
									<option key={i} value={place}>
										{place}
									</option>
								);
							})}
						</select>
					</div>
				</div>
			</div>
			<div>
				<Breadcrumbs links={[{ label: t("vacancies_title") }]} />
				<h1 className="vacancies-page__title">{t("vacancies_title")}</h1>
				<div className="vacancies-page-container">
					{filteredVacancies.map((vacancy, index) => (
						<Vacancy key={index} vacancy={vacancy} />
					))}
				</div>
				<button onClick={() => setFilterVisible(true)} className="filter-btn">
					Фільтри
				</button>
				<ScrollToTopBtn />
			</div>
		</>
	);
}
