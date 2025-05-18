import { useTranslation } from "react-i18next";
import Vacancy from "../Vacancy/Vacancy";
import "./Vacancies.scss";
import { useEffect } from "react";

const Vacancies = ({ vacanciesData, isLoading }) => {
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
					<span>{t("vacancies_r_loading")}</span>
				</div>
			) : (
				<div className={"vacancies-container"}>
					{vacanciesData.reverse().map((vacancy, index) => {
						return <Vacancy key={index} vacancy={vacancy} />;
					})}
				</div>
			)}
		</div>
	);
};

export default Vacancies;
