import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
	const { t } = useTranslation();
	return (
		<>
			<Helmet>
				<title>Сторінку не знайдено &bull; flovas {t("logo_title")}</title>
			</Helmet>
			<div className="not-found">
				<span style={{ fontWeight: 500, fontSize: "3rem" }}>404</span>
				<span>Сторінку не знайдено</span>
				<NavLink className="not-found__link" to="/">
					Повернутись на головну
				</NavLink>
			</div>
		</>
	);
};

export default NotFound;
