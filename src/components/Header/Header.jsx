import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import LngSelect from "../LngSelect/LngSelect";
import MenuBtn from "../MenuBtn/MenuBtn";
import Menu from "../Menu/Menu";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./Header.scss";

const Header = ({ vacanciesData }) => {
	const { t, i18n } = useTranslation();

	const { pathname } = useLocation();

	const indicatorRef = useRef(null);
	const navRef = useRef(null);
	const [indicatorStyle, setIndicatorStyle] = useState({});

	const updateIndicator = () => {
		const activeLink = navRef.current?.querySelector(".nav-link.active");

		if (activeLink && indicatorRef.current) {
			setIndicatorStyle({
				width: `${activeLink.offsetWidth}px`,
				left: `${activeLink.offsetLeft}px`,
				transition: "all 0.3s",
			});
		}
	};

	function getRect(sections, navLinks, menuDots) {
		navLinks.forEach((link) => link.classList.remove("active"));
		menuDots.forEach((link) => link.classList.remove("dot--active"));

		sections.forEach((section, index) => {
			if (!section) return;

			const sectionRect = section.getBoundingClientRect();

			if (sectionRect.top <= 80 && sectionRect.bottom >= 85) {
				navLinks[index].classList.add("active");
				menuDots[index].classList.add("dot--active");
			}
		});

		updateIndicator();
	}

	useEffect(() => {
		const sections = [
			document.querySelector(".homie"),
			document.querySelector(".vacancies"),
			document.querySelector(".about"),
			document.querySelector(".contacts"),
		];
		const navLinks = document.querySelectorAll(".nav-link");
		const menuDots = document.querySelectorAll(".dot");

		const handleGetRectOnScroll = () => getRect(sections, navLinks, menuDots);

		setTimeout(() => {
			handleGetRectOnScroll();
		}, 100);

		if (!menuDots || !navLinks.length || !sections.some(Boolean)) return;

		document.addEventListener("scroll", handleGetRectOnScroll);

		return () => {
			document.removeEventListener("scroll", handleGetRectOnScroll);
		};
	}, [pathname, i18n.language]);

	useEffect(() => {
		const navLinks = document.querySelectorAll(".nav-link");
		const menuDots = document.querySelectorAll(".dot");
		// Reset indicator and dots when navigating to another page
		const resetActiveStates = () => {
			navLinks.forEach((link) => link.classList.remove("active"));
			menuDots.forEach((dot) => dot.classList.remove("dot--active"));

			// Reset indicator style
			setIndicatorStyle({
				width: "0",
				left: "0",
			});
		};

		resetActiveStates();
	}, [pathname]);

	return (
		<header className={"header"}>
			<div className="header-top">
				<MenuBtn />
				<HashLink to={"/#home"} className={"header__logo"}>
					flovas <span>{t("logo_title")}</span>
				</HashLink>
				<nav ref={navRef} className="header__nav">
					<HashLink className={"nav-link active"} to={"/#home"}>
						{t("home_title")}
					</HashLink>
					<HashLink className={"nav-link"} to={"/#vacancies"}>
						{t("vacancies_title")}
						<span className="nav-link__vacancies-qty">
							{vacanciesData.length}
						</span>
					</HashLink>
					<HashLink className={"nav-link"} to={"/#about"}>
						{t("about_title")} Flovas
					</HashLink>
					<HashLink className={"nav-link"} to={"/#contacts"}>
						{t("contacts_title")}
					</HashLink>
					<div
						className={"nav-link-indicator"}
						ref={indicatorRef}
						style={indicatorStyle}
					></div>
				</nav>
				<LngSelect />
			</div>
			<Menu vacanciesData={vacanciesData} />
		</header>
	);
};

export default Header;
