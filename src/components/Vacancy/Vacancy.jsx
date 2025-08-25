import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "./Vacancy.scss";

const Vacancy = ({ vacancy }) => {
	const { t } = useTranslation();

	const { _id, img, place, title, updatedAt, isActive } = vacancy;

	useEffect(() => {
		document.querySelector(".vacancy__btn").addEventListener("click", () => {
			document.querySelector(".contact-us").classList.add("contact-us--active");
			document
				.querySelector(".contact-us__curtain")
				.classList.add("contact-us__curtain--active");
		});
	}, []);

	return (
		<div className={`${isActive ? "vacancy" : "vacancy vacancy--inactive"}`}>
			{img ? (
				<img src={img} alt={title} loading="lazy" />
			) : (
				<div className="vacancy__no-img"></div>
			)}
			<div className="vacancy__details">
				<p className={"vacancy__date"}>
					Опубліковано: {updatedAt.slice(0, 10)}
				</p>
				<p>
					<span style={{ fontWeight: 500 }}>Місто</span>: {place}
				</p>
				<p className={"vacancy__title"}>{title}</p>
			</div>
			<div className="vacancy__link-container">
				<NavLink className={"vacancy__link"} to={`/vacancy-page/${_id}`}>
					{t("more_info_btn")}
				</NavLink>
				<button className={"vacancy__btn"}>{t("contact_us_title")}</button>
			</div>
		</div>
	);
};

export default Vacancy;
