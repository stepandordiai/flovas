import { getTranslations } from "next-intl/server";
import "./WebApp.scss";

interface WebAppProps {
	locale: string;
}

const WebApp = async ({ locale }: WebAppProps) => {
	const t = await getTranslations();
	const baseUrl = `https://www.flovas.cz/${locale}`;

	return (
		<section className="web-app" id="web-aplikace">
			<h2 className="web-app__title">{t("web_app.title")}</h2>
			<div className="web-app__container">
				<img width={200} src="/widget.png" alt="flovas app sample on mobile" />
				<div>
					<h3 style={{ fontSize: "20px", fontWeight: 500, marginBottom: 10 }}>
						Як встановити застосунок на телефон
					</h3>
					<ol className="web-app__list">
						<li>
							{t("web_app.item_1_start")}{" "}
							<a href={baseUrl} target="_blank">
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
							<a href={baseUrl} target="_blank">
								www.flovas.cz
							</a>{" "}
							{t("web_app.item_4_end")}
						</li>
						<li>
							<ul>
								<li>Зручний та швидкий доступ до актуальних вакансій</li>
								<li>Не потрібно витрачати час на пошук вакансій в інтернеті</li>
								<li>Додаток завжди під рукою у вашому телефоні</li>
							</ul>
						</li>
					</ol>
				</div>
			</div>
		</section>
	);
};

export default WebApp;
