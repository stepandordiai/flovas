import { useTranslation } from "react-i18next";
import "./About.scss";

const About = () => {
	const { t } = useTranslation();

	return (
		<div className="about" id="about">
			<h2 className="about__title">{t("about_title")} flovas s.r.o.</h2>
			<h3 className="about__list-title">{t("about.our_advantages_title")}</h3>
			<ul className="about__list">
				<li>{t("about.our_advantages1")}</li>
				<li>{t("about.our_advantages2")}</li>
				<li>{t("about.our_advantages3")}</li>
				<li>{t("about.our_advantages4")}</li>
				<li>{t("about.our_advantages5")}</li>
				<li>{t("about.our_advantages6")}</li>
				<li>{t("about.our_advantages7")}</li>
				<li>{t("about.our_advantages8")}</li>
				<li>{t("about.our_advantages9")}</li>
				<li>{t("about.our_advantages10")}</li>
				<li>{t("about.our_advantages11")}</li>
				<li>{t("about.our_advantages12")}</li>
				<li>{t("about.our_advantages13")}</li>
				<li>{t("about.our_advantages14")}</li>
			</ul>
		</div>
	);
};

export default About;
