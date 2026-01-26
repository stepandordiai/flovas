"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import "./Vacancy.scss";
import { VacancyInterface } from "@/app/interfaces/Vacancy";

type VacancyTypes = {
	vacancy: VacancyInterface;
};

const Vacancy = ({ vacancy }: VacancyTypes) => {
	const t = useTranslations();

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
				<Link className="vacancy__link" href={`/${_id}`}>
					{t("more_info_btn")}
				</Link>
				{/* <button onClick={handleTelFormBanner} className="vacancy__btn">
					{t("contact_us_title")}
				</button> */}
			</div>
		</div>
	);
};

export default Vacancy;
