"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { VacancyInterface } from "@/interfaces/Vacancy";
import Image from "next/image";
import getUpdatedDate from "@/utils/getUpdatedDate";
import ClockIcon from "@/components/icons/ClockIcon";
import GeoIcon from "@/components/icons/GeoIcon";
import "./Vacancy.scss";

type VacancyProps = {
	vacancy: VacancyInterface;
};

const Vacancy = ({ vacancy }: VacancyProps) => {
	const t = useTranslations();

	const { id, img, is_active, updated_at, place, title, salary, badges } =
		vacancy;

	// FIXME:
	const [imgError, setImgError] = useState(false);

	return (
		// TODO: learn this
		<article className="vacancy">
			<div
				style={{
					position: "relative",
					borderRadius: "25px 25px 0 0",
					overflow: "hidden",
				}}
			>
				<p
					className={`vacancy-indicator ${is_active ? "vacancy__active" : "vacancy__inactive"}`}
				>
					<span></span>
					<span>{t(is_active ? "active_vacancy" : "inactive_vacancy")}</span>
				</p>
				<div className="vacancy-salary">
					<span style={{ fontSize: "1rem" }}>Заробітна плата</span>
					<span style={{ fontSize: "1.5rem" }}>
						<strong>{salary}</strong> Kč/год
					</span>
				</div>

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
			</div>
			<div className="vacancy__details">
				<span className="vacancy__date">
					<ClockIcon /> <span>Оновлено {getUpdatedDate(updated_at)}</span>
				</span>
				<span className="vacancy__place">
					<GeoIcon /> {place}
				</span>
				<h3 style={{ fontSize: "20px", fontWeight: 600 }}>{title}</h3>
				{badges && badges.length > 0 && (
					<ul style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
						{badges?.map((b) => {
							return (
								<li
									key={b}
									style={{
										background: "#fff",
										padding: "5px",
										fontSize: "0.9rem",
										borderRadius: "10px",
									}}
								>
									{b}
								</li>
							);
						})}
					</ul>
				)}
			</div>
			<Link className="vacancy__link" href={`/prace/${id}`} scroll={true}>
				{t("more_info_btn")}
			</Link>
		</article>
	);
};

export default Vacancy;
