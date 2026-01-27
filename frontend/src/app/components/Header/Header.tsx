"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import linksData from "@/app/lib/data/links-data.json";
import LngSelect from "../LngSelect/LngSelect";
import classNames from "classnames";
import { Link } from "@/i18n/navigation";
import { VacancyInterface } from "@/app/interfaces/Vacancy";
import "./Header.scss";

type HeaderProps = {
	vacancies: VacancyInterface[];
};

const Header = ({ vacancies }: HeaderProps) => {
	const t = useTranslations();
	const pathname = usePathname();
	const indicatorRef = useRef<HTMLDivElement>(null);
	const navRef = useRef<HTMLElement>(null);

	const [indicatorStyle, setIndicatorStyle] = useState({});
	const [menuOpen, setMenuOpen] = useState(false);

	const updateIndicator = () => {
		if (!navRef.current) return;

		const activeLink = navRef.current.querySelector(
			".nav-link.active",
		) as HTMLElement;

		if (activeLink && indicatorRef.current) {
			setIndicatorStyle({
				width: `${activeLink.offsetWidth}px`,
				left: `${activeLink.offsetLeft}px`,
				transition: "all 0.3s",
			});
		}
	};

	function getRect(
		sections: HTMLElement[],
		navLinks: NodeListOf<HTMLAnchorElement>,
		menuDots: NodeListOf<HTMLElement>,
	) {
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

	// FIXME:
	useEffect(() => {
		const sections = [
			document.querySelector(".home-top") as HTMLElement,
			document.querySelector(".vacancies") as HTMLElement,
			document.querySelector(".about") as HTMLElement,
			document.querySelector(".contacts") as HTMLElement,
			document.querySelector(".web-app") as HTMLElement,
		];
		const navLinks = document.querySelectorAll(
			".nav-link",
		) as NodeListOf<HTMLAnchorElement>;
		const menuDots = document.querySelectorAll(
			".dot",
		) as NodeListOf<HTMLElement>;

		const handleGetRectOnScroll = () => getRect(sections, navLinks, menuDots);

		setTimeout(() => {
			handleGetRectOnScroll();
		}, 100);

		if (!menuDots || !navLinks.length || !sections.some(Boolean)) return;

		document.addEventListener("scroll", handleGetRectOnScroll);

		return () => {
			document.removeEventListener("scroll", handleGetRectOnScroll);
		};
	}, [pathname, t]);

	// FIXME:
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

	// menu

	useEffect(() => {
		const closeMenu = () => setMenuOpen(false);

		const closeMenuOnEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMenuOpen(false);
		};

		// TODO: window is better than document for scroll
		window.addEventListener("scroll", closeMenu);
		document.addEventListener("keydown", closeMenuOnEsc);

		return () => {
			window.removeEventListener("scroll", closeMenu);
			document.removeEventListener("keydown", closeMenuOnEsc);
		};
	}, []);

	const toggleMenu = () => setMenuOpen((prev) => !prev);

	return (
		<header className="header">
			<div className="header-top">
				<button
					onClick={toggleMenu}
					className="menu-btn"
					aria-expanded={menuOpen}
					aria-controls="menu"
				>
					<span className="menu-btn__title">{t("menu")}</span>
					<span
						className={classNames("menu-btn__dot", {
							"menu-btn__dot--active": menuOpen,
						})}
					></span>
				</button>
				<Link href="/#home" className="header__logo">
					flovas <span>{t("logo_title")}</span>
				</Link>
				<nav ref={navRef} className="header__nav">
					{linksData.map((link, index) => {
						return (
							<Link key={index} className="nav-link active" href={link.path}>
								{t(link.name)}
								{link.vacanciesQty && (
									<span className="nav-link__vacancies-qty">
										{vacancies.length}
									</span>
								)}
							</Link>
						);
					})}
					<div
						className="nav-link-indicator"
						ref={indicatorRef}
						style={indicatorStyle}
					></div>
				</nav>
				<LngSelect />
			</div>

			{/* menu */}

			<nav
				className={classNames("menu", {
					"menu--active": menuOpen,
				})}
				id="menu"
				aria-hidden={!menuOpen}
			>
				<div className="menu__inner">
					{linksData.map((link, index) => {
						return (
							<div key={index} className="dot-link-container">
								<div className="dot dot--active"></div>
								<Link className="menu__link" href={link.path}>
									{t(link.name)}
									{link.vacanciesQty && (
										<span className="menu__link-vacancies-qty">
											{vacancies.length}
										</span>
									)}
								</Link>
							</div>
						);
					})}
				</div>
			</nav>
		</header>
	);
};

export default Header;
