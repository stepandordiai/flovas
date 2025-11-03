import { useTranslation } from "react-i18next";
import img from "/Home Screen Widgets - iPhone.png";
import shareIcon from "/icons/share.png";
import "./WebApp.scss";

const WebApp = () => {
	const { t } = useTranslation();

	return (
		<div className="web-app" id="web-app">
			<h2 className="web-app__title">flovas {t("web_app.title")}</h2>
			<div className="web-app__container">
				<img width={200} src={img} alt="Flovas app sample on mobile" />
				<ul className="web-app__list">
					<li>
						{t("web_app.item_1_start")}{" "}
						<a href="https://www.flovas.cz/" target="_blank">
							www.flovas.cz
						</a>{" "}
						{t("web_app.item_1_end")}
					</li>
					<li>
						{t("web_app.item_2_start")}{" "}
						<img width={20} src={shareIcon} alt="" /> {t("web_app.item_2_end")}
					</li>
					<li>{t("web_app.item_3")}</li>
					<li>
						{t("web_app.item_4_start")}{" "}
						<a href="https://www.flovas.cz/" target="_blank">
							www.flovas.cz
						</a>{" "}
						{t("web_app.item_4_end")}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default WebApp;
