import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./VacancyPage.scss";

const VacancyPage = ({ vacanciesData }) => {
	const { t } = useTranslation();

	const { id } = useParams(null);

	const vacancy = vacanciesData.find((vacancy) => vacancy._id == id);

	if (!vacancy) return;

	return (
		<>
			<Helmet>
				{/* <meta name="description" content="" /> */}
				<title>
					{vacancy.title} &bull; flovas {t("logo_title")}
				</title>
				{/* <link rel="canonical" href="" /> */}
			</Helmet>
			<div className="vacancy-page">
				<div className="vacancy-page__container">
					<img className="vacancy-page__img" src={vacancy.img} alt="" />
					<div className="vacancy-page__details">
						<div>
							<p className="vacancy-page__place">Місто: {vacancy.place}</p>
							<p className="vacancy-page__title">{vacancy.title}</p>
						</div>
						<div className="vacancy-page__link-container">
							<a className="vacancy-page__link" href="tel:+420777957290">
								{t("contact_us_title")}
							</a>
							<HashLink className="vacancy-page__link" href="/#vacancies">
								{t("vacancies_title")}
							</HashLink>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default VacancyPage;
