import { useTranslation } from "react-i18next";
import Vacancy from "../Vacancy/Vacancy";
import { useEffect } from "react";
import "./Vacancies.scss";

const Vacancies = ({ vacanciesData, isLoading, error }) => {
	const { t } = useTranslation();

	useEffect(() => {
		const vacancies = document.querySelectorAll(".vacancy");

		const handleVacancyOnScroll = () => {
			vacancies.forEach((vacancy) => {
				if (!vacancy) return;

				const vacancyRect = vacancy.getBoundingClientRect();
				if (vacancyRect.top < window.innerHeight - 100) {
					vacancy.classList.add("vacancy--active");
				}
			});
		};

		handleVacancyOnScroll();

		document.addEventListener("scroll", handleVacancyOnScroll);

		return () => {
			document.removeEventListener("scroll", handleVacancyOnScroll);
		};
	}, [isLoading]);

	return (
		<div className="vacancies" id="vacancies">
			<h2 className="vacancies__title">{t("vacancies_title")}</h2>
			{isLoading ? (
				<div className="vacancies-loading">
					<div className="vacancies-loading__circle">
						<span></span>
					</div>
					<span>{t("vacancies_r_loading")}...</span>
				</div>
			) : error ? (
				<div className="vacancies-error">
					<span>Вакансії зараз недоступні</span>
				</div>
			) : vacanciesData.length > 0 ? (
				<div className="vacancies-container">
					{vacanciesData
						.slice() // avoid mutating original array with reverse()
						.reverse()
						.map((vacancy, index) => (
							<Vacancy key={index} vacancy={vacancy} />
						))}
				</div>
			) : (
				<div className="vacancies-empty">
					<span>{t("vacancies_r_empty")}</span>
				</div>
			)}
		</div>
	);
};

export default Vacancies;
