"use client";

import { useTranslations } from "next-intl";
import "./ScrollToTopBtn.scss";

const scrollToTopOnClick = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

const ScrollToTopBtn = () => {
	const t = useTranslations();

	return (
		<button className="scroll-to-top-btn" onClick={scrollToTopOnClick}>
			{t("home.backToTop")}
		</button>
	);
};

export default ScrollToTopBtn;
