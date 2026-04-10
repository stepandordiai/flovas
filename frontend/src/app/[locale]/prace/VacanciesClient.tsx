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
	const [vacanciesFilter, setVacanciesFilter] = useState({
		place: "",
		jobType: "",
	});

	const activeFiltersLength =
		Object.values(vacanciesFilter).filter(Boolean).length;

	const handleVacanciesFilter = (name: string, value: string) => {
		setVacanciesFilter((prev) => ({ ...prev, [name]: value }));
	};

	// TODO: learn this
	const [visibleLength, setVisibleLength] = useState(12);

	const filteredVacancies = vacancies.filter((vacancy) => {
		const filteredPlace = vacanciesFilter.place
			? vacanciesFilter.place === vacancy.place
			: true;
		const filteredJobType = vacanciesFilter.jobType
			? vacanciesFilter.jobType === vacancy.jobType
			: true;

		return filteredPlace && filteredJobType;
	});

	const [filterVisible, setFilterVisible] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [vacanciesFilter]);

	const VacanciesModal = ({
		filterVisible,
		setFilterVisible,
	}: {
		filterVisible: boolean;
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
								onChange={(e) => handleVacanciesFilter("place", e.target.value)}
								value={vacanciesFilter.place}
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
								onChange={(e) =>
									handleVacanciesFilter("jobType", e.target.value)
								}
								value={vacanciesFilter.jobType}
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
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								gap: 5,
								flexWrap: "wrap",
							}}
						>
							<button
								style={{
									background: "#000",
									color: "#fff",
									height: 50,
									borderRadius: 25,
									padding: "0 12.5px",
									marginTop: 10,
								}}
								onClick={() => {
									setVacanciesFilter({
										place: "",
										jobType: "",
									});
								}}
							>
								Скинути фільтри{" "}
								{activeFiltersLength > 0 && (
									<span>({activeFiltersLength})</span>
								)}
							</button>
							<button
								style={{
									background: "var(--sec-accent-clr)",
									color: "#000",
									padding: "0 12.5px",
									height: 50,
									borderRadius: 25,
									marginTop: 10,
								}}
								onClick={() => setFilterVisible(false)}
							>
								Показати результати ({filteredVacancies.length})
							</button>
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
				setFilterVisible={setFilterVisible}
			/>
			<div className="vacancies-filter">
				<div className="vacancies-filter-inner">
					<p className="lng-select-banner__title">Фільтри</p>
					<div>
						<label htmlFor="">Місце роботи</label>
						<select
							className="input"
							onChange={(e) => handleVacanciesFilter("place", e.target.value)}
							value={vacanciesFilter.place}
						>
							<option value="">Всі міста</option>
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
							onChange={(e) => handleVacanciesFilter("jobType", e.target.value)}
							value={vacanciesFilter.jobType}
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
					<span>Знайдено вакансій: {filteredVacancies.length}</span>
					<button
						style={{
							background: "#000",
							color: "#fff",
							height: 50,
							borderRadius: 25,
							marginTop: "auto",
						}}
						onClick={() => {
							setVacanciesFilter({
								place: "",
								jobType: "",
							});
						}}
					>
						Скинути фільтри{" "}
						{activeFiltersLength > 0 && <span>({activeFiltersLength})</span>}
					</button>
				</div>
			</div>
			<div style={{ width: "100%" }}>
				<Breadcrumbs links={[{ label: t("vacancies_title") }]} />
				<h1 className="vacancies-page__title">{t("vacancies_title")}</h1>
				{filteredVacancies.length < 1 ? (
					<p>Вибраних вакансій нажаль немає.</p>
				) : (
					<div className="vacancies-page-container">
						{/* TODO: learn this */}
						{filteredVacancies.slice(0, visibleLength).map((vacancy, index) => (
							<Vacancy key={index} vacancy={vacancy} />
						))}
					</div>
				)}
				{/* TODO: learn this */}
				{filteredVacancies.length > visibleLength && (
					<button
						className="vacancies__btn"
						onClick={() => setVisibleLength((prev) => prev + 8)}
					>
						Показати більше
					</button>
				)}
				{/* <div style={{ marginTop: "auto", width: "100%" }}> */}
				<button onClick={() => setFilterVisible(true)} className="filter-btn">
					Фільтри{" "}
					{activeFiltersLength > 0 && <span>({activeFiltersLength})</span>}
				</button>
				<div className="vacancies-scroll-top-top-btn-wrapper">
					<ScrollToTopBtn />
				</div>
				{/* </div> */}
			</div>
		</>
	);
}
