import { getTranslations } from "next-intl/server";
// import img from "/widget.png";
// import shareIcon from "/icons/share.svg";
import "./WebApp.scss";

const WebApp = async () => {
	const t = await getTranslations();

	return (
		<section className="web-app" id="web-app">
			<h2 className="web-app__title">flovas {t("web_app.title")}</h2>
			<div className="web-app__container">
				{/* <img width={200} src={img.src} alt="Flovas app sample on mobile" /> */}
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
						{/* <img width={20} height={20} src={shareIcon} alt="" />{" "} */}
						{t("web_app.item_2_end")}
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
		</section>
	);
};

export default WebApp;
