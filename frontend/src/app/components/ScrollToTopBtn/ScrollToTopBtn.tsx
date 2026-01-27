"use client";

import { useTranslations } from "next-intl";
import "./ScrollToTopBtn.scss";

const handleScrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

const ScrollToTopBtn = () => {
	const t = useTranslations();

	return (
		<button className="scroll-to-top-btn" onClick={handleScrollToTop}>
			{t("home.backToTop")}
		</button>
	);
};

export default ScrollToTopBtn;
