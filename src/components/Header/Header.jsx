import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import LngSelect from "../LngSelect/LngSelect";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./Header.scss";

const Header = ({ vacanciesData }) => {
	const { t, i18n } = useTranslation();

	const { pathname } = useLocation();

	const indicatorRef = useRef(null);
	const navRef = useRef(null);

	const [indicatorStyle, setIndicatorStyle] = useState({});
	const [menuActive, setMenuActive] = useState(false);

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
			document.querySelector(".home-top"),
			document.querySelector(".vacancies"),
			document.querySelector(".about"),
			document.querySelector(".contacts"),
			document.querySelector(".web-app"),
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

	// menu-btn

	function toggleMenuBtn() {
		setMenuActive((prev) => !prev);
	}

	// menu

	useEffect(() => {
		const closeMenuOnScroll = () => setMenuActive(false);

		const closeMenuOnEsc = (e) => {
			if (e.key === "Escape") {
				setMenuActive((prev) => (prev ? false : prev));
			}
		};

		document.addEventListener("keydown", closeMenuOnEsc);
		document.addEventListener("scroll", closeMenuOnScroll);

		return () => {
			document.removeEventListener("scroll", closeMenuOnScroll);
			document.removeEventListener("keydown", closeMenuOnEsc);
		};
	}, []);

	return (
		<header className="header">
			<div className="header-top">
				<button onClick={toggleMenuBtn} className="menu-btn">
					<div className="menu-btn__title">{t("menu")}</div>
					<div
						className={`menu-btn__dot ${
							menuActive ? "menu-btn__dot--active" : ""
						}`}
					></div>
				</button>
				<HashLink to="/#home" className="header__logo" smooth>
					flovas <span>{t("logo_title")}</span>
				</HashLink>
				<nav ref={navRef} className="header__nav">
					<HashLink className="nav-link active" to="/#home" smooth>
						{t("home_title")}
					</HashLink>
					<HashLink className="nav-link" to="/#vacancies" smooth>
						{t("vacancies_title")}
						<span className="nav-link__vacancies-qty">
							{vacanciesData.length}
						</span>
					</HashLink>
					<HashLink className="nav-link" to="/#about" smooth>
						{t("about_title")} Flovas
					</HashLink>
					<HashLink className="nav-link" to="/#contacts" smooth>
						{t("contacts_title")}
					</HashLink>
					<HashLink className="nav-link" to="/#web-app" smooth>
						{t("web_app_title")}
					</HashLink>
					<div
						className="nav-link-indicator"
						ref={indicatorRef}
						style={indicatorStyle}
					></div>
				</nav>
				<LngSelect />
			</div>

			{/* menu */}

			<div className={`menu ${menuActive ? "menu--active" : ""}`}>
				<div className="menu__inner">
					<div className="dot-link-container">
						<div className="dot dot--active"></div>
						<HashLink className="menu__link" to="/#home" smooth>
							{t("home_title")}
						</HashLink>
					</div>
					<div className="dot-link-container">
						<div className="dot"></div>
						<HashLink className="menu__link" to="/#vacancies" smooth>
							{t("vacancies_title")}
							<span className="menu__link-vacancies-qty">
								{vacanciesData.length}
							</span>
						</HashLink>
					</div>
					<div className="dot-link-container">
						<div className="dot"></div>
						<HashLink className="menu__link" to="/#about" smooth>
							{t("about_title")}{" "}
							<span className="menu__link-extra">flovas</span>
						</HashLink>
					</div>
					<div className="dot-link-container">
						<div className="dot"></div>
						<HashLink className="menu__link" to="/#contacts" smooth>
							{t("contacts_title")}
						</HashLink>
					</div>
					<div className="dot-link-container">
						<div className="dot"></div>
						<HashLink className="menu__link" to="/#web-app" smooth>
							{t("web_app_title")}
						</HashLink>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
