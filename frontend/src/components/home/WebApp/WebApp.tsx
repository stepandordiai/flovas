import { getTranslations } from "next-intl/server";
import { BASE_URL } from "@/lib/constants";
import "./WebApp.scss";

const WebApp = async () => {
	const t = await getTranslations();

	return (
		<section className="web-app" id="web-aplikace">
			<h2 className="web-app__title">{t("web_app.heading")}</h2>
			<div className="web-app__container">
				<img width={200} src="/widget.png" alt="flovas app sample on mobile" />
				<div>
					<h3 style={{ fontSize: "20px", fontWeight: 500, marginBottom: 10 }}>
						{t("web_app.subheading")}
					</h3>
					<ol className="web-app__list">
						<li>
							{t("web_app.item_1_start")}{" "}
							<a href={BASE_URL} target="_blank">
								www.flovas.cz
							</a>{" "}
							{t("web_app.item_1_end")}
						</li>
						<li>
							{t("web_app.item_2_start")}{" "}
							<img width={20} height={20} src="/icons/share.svg" alt="" />{" "}
							{t("web_app.item_2_end")}
						</li>
						<li>{t("web_app.item_3")}</li>
						<li>
							{t("web_app.item_4_start")}{" "}
							<a href={BASE_URL} target="_blank">
								www.flovas.cz
							</a>{" "}
							{t("web_app.item_4_end")}
						</li>
						<li>
							<ul>
								<li>
									{t("web_app.quickAndConvenientAccessToCurrentVacancies")}
								</li>
								<li>
									{t("web_app.noNeedToSpendTimeSearchingForVacanciesOnline")}
								</li>
								<li>{t("web_app.theAppIsAlwaysAtHandOnYourPhone")}</li>
							</ul>
						</li>
					</ol>
				</div>
			</div>
		</section>
	);
};

export default WebApp;
