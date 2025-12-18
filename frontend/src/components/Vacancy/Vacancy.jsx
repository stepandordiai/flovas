import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Vacancy.scss";

const Vacancy = ({ vacancy, handleTelFormBanner }) => {
	const { t } = useTranslation();

	const { _id, img, place, title, updatedAt, isActive } = vacancy;

	const [imgError, setImgError] = useState(false);

	return (
		<div className="vacancy">
			{img && !imgError ? (
				// I can do with fallback.png also src={imgError ? "/fallback.png" : img}
				<img
					onError={() => setImgError(true)}
					src={img}
					alt={title}
					loading="lazy"
				/>
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
				<p>📍 {place}</p>
				<p style={{ fontWeight: 500 }}>{title}</p>
			</div>
			<div className="vacancy__link-container">
				<NavLink className="vacancy__link" to={`/vacancy-page/${_id}`}>
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
