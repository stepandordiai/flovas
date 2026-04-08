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
	const [jobTypeFilter, setJobTypeFilter] = useState("");

	const filteredVacancies = vacancies.filter((vacancy) => {
		const filteredPlace = placeFilter ? placeFilter === vacancy.place : true;
		const filteredJobType = jobTypeFilter
			? jobTypeFilter === vacancy.jobType
			: true;

		return filteredPlace && filteredJobType;
	});

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
							<label htmlFor="place-select">Місце роботи</label>
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
						<div>
							<label htmlFor="">Посада</label>
							<select
								className="input"
								onChange={(e) => setJobTypeFilter(e.target.value)}
								value={jobTypeFilter}
							>
								<option value="">Всі посади</option>
								{uniqueJobTypes.map((jobType, i) => {
									return (
										<option key={i} value={jobType}>
											{jobType}
										</option>
									);
								})}
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
	const uniqueJobTypes = [
		...new Set(vacancies.map((vacancy) => vacancy.jobType)),
	];

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
						<label htmlFor="">Місце роботи</label>
						<select
							className="input"
							onChange={(e) => setPlaceFilter(e.target.value)}
							value={placeFilter}
						>
							<option value="">
								Всі міста <span>{vacancies?.length}вакансії</span>
							</option>
							{uniquePlaces.map((place, i) => {
								// const vacanciesQty = vacancies.filter((v) => {
								// 	return jobTypeFilter
								// 		? v.jobType === jobTypeFilter && v.place === place
								// 		: v.place === placeFilter;
								// }).length;
								return (
									<option key={i} value={place}>
										{place}
										{/* {vacanciesQty === 0 ? "" : vacanciesQty} */}
									</option>
								);
							})}
						</select>
					</div>
					<div>
						<label htmlFor="">Посада</label>
						<select
							className="input"
							onChange={(e) => setJobTypeFilter(e.target.value)}
							value={jobTypeFilter}
						>
							<option value="">Всі посади</option>
							{uniqueJobTypes.map((jobType, i) => {
								// const vacanciesQty = vacancies.filter((v) => {
								// 	return placeFilter
								// 		? v.place === placeFilter && v.jobType === jobType
								// 		: v.jobType === jobType;
								// }).length;

								return (
									<option key={i} value={jobType}>
										{jobType}
										{/* {vacanciesQty === 0 ? "" : vacanciesQty} */}
									</option>
								);
							})}
						</select>
					</div>
				</div>
			</div>
			<div style={{ width: "100%" }}>
				<Breadcrumbs links={[{ label: t("vacancies_title") }]} />
				<h1 className="vacancies-page__title">{t("vacancies_title")}</h1>
				{filteredVacancies.length < 1 ? (
					<p>Вибраних вакансій нажаль немає.</p>
				) : (
					<div className="vacancies-page-container">
						{filteredVacancies.map((vacancy, index) => (
							<Vacancy key={index} vacancy={vacancy} />
						))}
					</div>
				)}
				{/* <div style={{ marginTop: "auto", width: "100%" }}> */}
				<button onClick={() => setFilterVisible(true)} className="filter-btn">
					Фільтри
				</button>
				<div className="vacancies-scroll-top-top-btn-wrapper">
					<ScrollToTopBtn />
				</div>
				{/* </div> */}
			</div>
		</>
	);
}
