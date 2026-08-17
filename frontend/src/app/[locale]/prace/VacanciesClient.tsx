"use client";

import { useTranslations } from "next-intl";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import Vacancy from "@/components/Vacancy/Vacancy";
import ScrollToTopBtn from "@/components/ScrollToTopBtn/ScrollToTopBtn";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";
import { VacancyInterface } from "@/interfaces/Vacancy";
import { useRouter } from "next/navigation";

export default function VacanciesClient({
	vacancies,
	places,
	jobTypes,
	initPlace,
	initJobType,
}: {
	vacancies: VacancyInterface[];
	places: string[];
	jobTypes: string[];
	initPlace?: string;
	initJobType?: string;
}) {
	const t = useTranslations();
	const router = useRouter();

	const [vacanciesFilter, setVacanciesFilter] = useState({
		place: initPlace ?? "",
		job_type: initJobType ?? "",
	});
	const [filterVisible, setFilterVisible] = useState(false);
	const [visibleLength, setVisibleLength] = useState(12);

	const handleVacanciesFilter = (name: string, value: string) => {
		setVacanciesFilter((prev) => ({ ...prev, [name]: value }));
	};

	// TODO: LEARN THIS
	const handleSubmit = () => {
		const query = new URLSearchParams();
		if (vacanciesFilter.place.trim())
			query.set("place", vacanciesFilter.place.trim());
		if (vacanciesFilter.job_type.trim())
			query.set("job_type", vacanciesFilter.job_type.trim());

		const queryString = query.toString();
		router.push(`/prace${queryString ? `?${queryString}` : ""}`);
	};

	const handleReset = () => {
		setVacanciesFilter({ place: "", job_type: "" });
		router.push("/prace");
	};

	const activeFiltersLength =
		Object.values(vacanciesFilter).filter(Boolean).length;

	const sortedVacancies = [
		...vacancies
			.filter((v) => v.is_active)
			.sort(
				(a, b) =>
					new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
			),
		...vacancies
			.filter((v) => !v.is_active)
			.sort(
				(a, b) =>
					new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
			),
	];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [vacancies]);

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
								{places.map((place, i) => (
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
									handleVacanciesFilter("job_type", e.target.value)
								}
								value={vacanciesFilter.job_type}
							>
								<option value="">Всі посади</option>
								{jobTypes.map((jobType, i) => {
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
								onClick={handleReset}
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
								onClick={handleSubmit}
							>
								Показати результати
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
						<label htmlFor="place">Місце роботи</label>
						<select
							id="place"
							className="input"
							onChange={(e) => handleVacanciesFilter("place", e.target.value)}
							value={vacanciesFilter.place}
						>
							<option value="">Всі міста</option>
							{places.map((place, i) => {
								return (
									<option key={i} value={place}>
										{place}
									</option>
								);
							})}
						</select>
					</div>
					<div>
						<label htmlFor="jobType">Посада</label>
						<select
							id="jobType"
							className="input"
							onChange={(e) =>
								handleVacanciesFilter("job_type", e.target.value)
							}
							value={vacanciesFilter.job_type}
						>
							<option value="">Всі посади</option>
							{jobTypes.map((jobType, i) => {
								return (
									<option key={i} value={jobType}>
										{jobType}
									</option>
								);
							})}
						</select>
					</div>
					<button
						style={{
							background: "#000",
							color: "#fff",
							height: 50,
							borderRadius: 25,
							marginTop: "auto",
						}}
						onClick={handleReset}
					>
						Скинути фільтри{" "}
						{activeFiltersLength > 0 && <span>({activeFiltersLength})</span>}
					</button>
					<button
						style={{
							background: "var(--sec-accent-clr)",
							color: "#000",
							height: 50,
							borderRadius: 25,
						}}
						onClick={handleSubmit}
					>
						Показати результати
					</button>
				</div>
			</div>
			<div style={{ width: "100%" }}>
				<Breadcrumbs links={[{ label: t("vacancies_title") }]} />
				<h1 className="vacancies-page__title">{t("vacancies_title")}</h1>
				{vacancies.length < 1 ? (
					<p>Вибраних вакансій нажаль немає.</p>
				) : (
					<div className="vacancies-page-container">
						{sortedVacancies.slice(0, visibleLength).map((vacancy, index) => (
							<Vacancy
								key={vacancy.id}
								vacancy={vacancy}
								index={index}
								priorityLength={4}
							/>
						))}
					</div>
				)}
				{vacancies.length > visibleLength && (
					<button
						className="vacancies__btn"
						onClick={() => setVisibleLength((prev) => prev + 8)}
					>
						Показати більше
					</button>
				)}
				<button onClick={() => setFilterVisible(true)} className="filter-btn">
					Фільтри{" "}
					{activeFiltersLength > 0 && <span>({activeFiltersLength})</span>}
				</button>
				<div className="vacancies-scroll-top-top-btn-wrapper">
					<ScrollToTopBtn />
				</div>
			</div>
		</>
	);
}
