import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "./Vacancy.scss";

const Vacancy = ({ vacancy, handleTelFormBanner }) => {
	const { t } = useTranslation();

	const { _id, img, place, title, updatedAt, isActive } = vacancy;

	return (
		<div className="vacancy">
			{img ? (
				<img src={img} alt={title} loading="lazy" />
			) : (
				<div className="vacancy__no-img"></div>
			)}
			<div className="vacancy__details">
				{isActive ? (
					<p className="vacancy__active">
						<span></span> <span>{t("active_vacancy")}</span>
					</p>
				) : (
					<p className="vacancy__inactive">
						<span></span> <span>{t("inactive_vacancy")}</span>
					</p>
				)}
				<p className="vacancy__date">Опубліковано: {updatedAt.slice(0, 10)}</p>
				<p>
					<span style={{ fontWeight: 500 }}>Місто</span>: {place}
				</p>
				<p className="vacancy__title">{title}</p>
			</div>
			<div className="vacancy__link-container">
				<NavLink className={"vacancy__link"} to={`/vacancy-page/${_id}`}>
					{t("more_info_btn")}
				</NavLink>
				<button onClick={handleTelFormBanner} className="vacancy__btn">
					{t("contact_us_title")}
				</button>
			</div>
		</div>
	);
};

export default Vacancy;
