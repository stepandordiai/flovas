import { useTranslation } from "react-i18next";
import "./ScrollToTopBtn.scss";

const scrollToTopOnClick = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

const ScrollToTopBtn = () => {
	const { t } = useTranslation();

	return (
		<button className="scroll-to-top-btn" onClick={scrollToTopOnClick}>
			{t("home.backToTop")}
		</button>
	);
};

export default ScrollToTopBtn;
