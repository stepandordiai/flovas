"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { VacancyInterface } from "@/app/interfaces/Vacancy";
import Image from "next/image";
import "./Vacancy.scss";

type VacancyProps = {
	vacancy: VacancyInterface;
};

const Vacancy = ({ vacancy }: VacancyProps) => {
	const t = useTranslations();

	const { id, img, isActive, createdAt, place, title, salary } = vacancy;

	// FIXME:
	const [imgError, setImgError] = useState(false);

	return (
		<div className="vacancy">
			{/* FIXME: */}
			{img && !imgError ? (
				// I can do with fallback.png also src={imgError ? "/fallback.png" : img}
				<Image
					onError={() => setImgError(true)}
					src={img}
					// TODO: ?
					width={440}
					height={440}
					alt={title}
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
				<p style={{ fontWeight: 500 }}>📍 Місто: {place}</p>
				<p style={{ fontSize: "18px", fontWeight: 600 }}>{title}</p>
				<p style={{ fontWeight: 500 }}>{salary}</p>
			</div>
			<Link className="vacancy__link" href={`/prace/${id}`} scroll={true}>
				{t("more_info_btn")}
			</Link>
		</div>
	);
};

export default Vacancy;
