"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { VacancyInterface } from "@/app/interfaces/Vacancy";
import TelFormBanner from "../TelFormBanner/TelFormBanner";
import "./Vacancy.scss";

type VacancyProps = {
	vacancy: VacancyInterface;
};

const Vacancy = ({ vacancy }: VacancyProps) => {
	const t = useTranslations();

	const { id, img, isActive, createdAt, place, title } = vacancy;

	const [imgError, setImgError] = useState(false);

	// TelFormBanner
	const [active, setActive] = useState(false);
	const handleTelFormBanner = () => setActive(true);

	return (
		<>
			<TelFormBanner active={active} setActive={setActive} />
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
					<p className="vacancy__date">Опубліковано: {createdAt}</p>
					<p>📍 {place}</p>
					<p style={{ fontWeight: 500 }}>{title}</p>
				</div>
				<div className="vacancy__link-container">
					<Link className="vacancy__link" href={`/prace/${id}`} scroll={true}>
						{t("more_info_btn")}
					</Link>
					<button onClick={handleTelFormBanner} className="vacancy__btn">
						{t("contact_us_title")}
					</button>
				</div>
			</div>
		</>
	);
};

export default Vacancy;
