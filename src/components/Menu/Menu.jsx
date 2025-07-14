import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import "./Menu.scss";

const Menu = ({ vacanciesData }) => {
	const { t } = useTranslation();

	useEffect(() => {
		document.querySelectorAll(".menu__link").forEach((link) => {
			link.addEventListener("click", () => {
				document
					.querySelector(".menu-btn__dot")
					.classList.remove("menu-btn__dot--active");
				document.querySelector(".menu").classList.remove("menu--active");
			});
		});

		document.addEventListener("scroll", () => {
			document
				.querySelector(".menu-btn__dot")
				.classList.remove("menu-btn__dot--active");
			document.querySelector(".menu").classList.remove("menu--active");
		});
	}, []);

	return (
		<div className="menu">
			<div className="menu__inner">
				<div className="dot-link-container">
					<div className="dot dot--active"></div>
					<HashLink className="menu__link" to="/#home">
						{t("home_title")}
					</HashLink>
				</div>
				<div className="dot-link-container">
					<div className="dot"></div>
					<HashLink className="menu__link" to="/#vacancies">
						{t("vacancies_title")}
						<span className="menu__link-vacancies-qty">
							{vacanciesData.length}
						</span>
					</HashLink>
				</div>
				<div className="dot-link-container">
					<div className="dot"></div>
					<HashLink className="menu__link" to="/#about">
						{t("about_title")} <span className="menu__link-extra">flovas</span>
					</HashLink>
				</div>
				<div className="dot-link-container">
					<div className="dot"></div>
					<HashLink className="menu__link" to="/#contacts">
						{t("contacts_title")}
					</HashLink>
				</div>
				<div className="dot-link-container">
					<div className="dot"></div>
					<HashLink className="menu__link" to="/#web-app">
						{t("web_app_title")}
					</HashLink>
				</div>
			</div>
		</div>
	);
};

export default Menu;
