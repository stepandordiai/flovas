import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import backIcon from "/icons/back.png";
import "./VacancyPage.scss";

const VacancyPage = ({ vacanciesData }) => {
	const { t } = useTranslation();

	const { id } = useParams(null);

	const vacancy = vacanciesData.find((vacancy) => vacancy._id === id);

	if (!vacancy) return;

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content="Робота в Чехії для українців 2025. flovas s.r.o. – кадрова агенція, яка надає легальне працевлаштування, житло та допомогу з документами по всій Чехії."
				/>
				<title>
					{vacancy.title} &bull; flovas {t("logo_title")}
				</title>
			</Helmet>
			<main className="vacancy-page">
				<div className="vacancy-page__top">
					<HashLink className="vacancy-page__top-link" to="/#vacancies">
						<img src={backIcon} width={20} height={20} alt="" />
						<span>Всі вакансії</span>
					</HashLink>
				</div>
				<div className="vacancy-page__details">
					{vacancy.img ? (
						<img
							className="vacancy-page__img"
							src={vacancy.img}
							alt=""
							loading="lazy"
						/>
					) : (
						<div className="vacancy-page__no-img"></div>
					)}
					<div style={{ display: "flex", flexDirection: "column", rowGap: 10 }}>
						<p className="vacancy__date">
							Опубліковано: {vacancy.updatedAt.slice(0, 10)}
						</p>
						<p>📍 {vacancy.place}</p>
						<p style={{ fontWeight: 500 }}>{vacancy.title}</p>
						<p style={{ whiteSpace: "pre-wrap" }}>{vacancy.desc}</p>
					</div>
					<a className="vacancy-page__link" href="tel:+420777957290">
						{t("contact_us_title")}
					</a>
				</div>
			</main>
		</>
	);
};

export default VacancyPage;
