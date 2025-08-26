import { useTranslation } from "react-i18next";
import Vacancy from "../Vacancy/Vacancy";
import "./Vacancies.scss";

const Vacancies = ({
	vacanciesData,
	isLoading,
	error,
	handleTelFormBanner,
}) => {
	const { t } = useTranslation();

	return (
		<div className="vacancies" id="vacancies">
			<h2 className="vacancies__title">{t("vacancies_title")}</h2>
			{isLoading ? (
				<div className="vacancies-loading">
					<div className="vacancies-loading__circle">
						<span></span>
					</div>
					<p>
						{t("vacancies_r_loading")}. (~30 {t("sec")}.)
					</p>
				</div>
			) : error ? (
				<p style={{ textAlign: "center" }}>{t("unavailable")}.</p>
			) : vacanciesData.length > 0 ? (
				<div className="vacancies-container">
					{vacanciesData
						.slice() // avoid mutating original array with reverse()
						.reverse()
						.map((vacancy, index) => (
							<Vacancy
								key={index}
								vacancy={vacancy}
								handleTelFormBanner={handleTelFormBanner}
							/>
						))}
				</div>
			) : (
				<p style={{ textAlign: "center" }}>{t("vacancies_r_empty")}.</p>
			)}
		</div>
	);
};

export default Vacancies;
