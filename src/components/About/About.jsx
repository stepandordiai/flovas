import { useTranslation } from "react-i18next";
import mapIcon from "/icons/czech.png";
import peopleIcon from "/icons/people.png";
import moneyIcon from "/icons/money.png";
import accommodationIcon from "/icons/accommodation.png";
import hiringIcon from "/icons/hiring.png";
import documentsIcon from "/icons/documents.png";
import insuranceIcon from "/icons/insurance.png";
import freeIcon from "/icons/free.png";
import hourIcon from "/icons/hour.png";
import busIcon from "/icons/bus.png";
import supportIcon from "/icons/support.png";
import misunderstandingIcon from "/icons/misunderstanding.png";
import movingIcon from "/icons/moving.png";
import "./About.scss";

const About = ({ placesData }) => {
	const { t } = useTranslation();

	return (
		<div className="about" id="about">
			<h2 className="about__title">{t("about_title")} FLOVAS s.r.o.</h2>
			<p className="about__desc">{t("about.desc")}</p>
			<h3 className="about__benefits-title">
				{t("about.our_advantages_title")}
			</h3>
			<ul className="about__benefits-list">
				<li className="about__benefits-item">
					<img src={mapIcon} width={50} height={50} alt="" />
					<span>{t("about.our_advantages1")}</span>
				</li>
				<li className="about__benefits-item">
					<img src={peopleIcon} width={50} height={50} alt="" />
					<span>{t("about.our_advantages2")}</span>
				</li>
				<li className="about__benefits-item">
					<img src={moneyIcon} width={50} height={50} alt="" />
					<span>{t("about.our_advantages3")}</span>
				</li>
				<li className="about__benefits-item">
					<img src={accommodationIcon} width={50} height={50} alt="" />
					<span>{t("about.our_advantages4")}</span>
				</li>
				<li className="about__benefits-item">
					<img src={hiringIcon} width={50} height={50} alt="" />
					<span>{t("about.our_advantages5")}</span>
				</li>
				<li className="about__benefits-item">
					<img src={documentsIcon} width={50} height={50} alt="" />
					<span>{t("about.our_advantages6")}</span>
				</li>
				<li className="about__benefits-item">
					<img src={insuranceIcon} width={50} height={50} alt="" />
					<span>{t("about.our_advantages7")}</span>
				</li>
				<li className="about__benefits-item">
					<img src={freeIcon} width={50} height={50} alt="" />
					<span>{t("about.our_advantages9")}</span>
				</li>
				<li className="about__benefits-item">
					<img src={hourIcon} width={50} height={50} alt="" />
					<span>{t("about.our_advantages10")}</span>
				</li>
				<li className="about__benefits-item">
					<img src={busIcon} width={50} height={50} alt="" />
					<span>{t("about.our_advantages11")}</span>
				</li>
				<li className="about__benefits-item">
					<img src={supportIcon} width={50} height={50} alt="" />
					<span>{t("about.our_advantages12")}</span>
				</li>
				<li className="about__benefits-item">
					<img src={misunderstandingIcon} width={50} height={50} alt="" />
					<span>{t("about.our_advantages13")}</span>
				</li>
				<li className="about__benefits-item">
					<img src={movingIcon} width={50} height={50} alt="" />
					<span>{t("about.our_advantages14")}</span>
				</li>
			</ul>
			<h3 className="about__goal-title">{t("about.goal_title")}</h3>
			<p className="about__goal-desc">{t("about.goal_desc")}</p>
			<h3 className="about__places-title">
				{t("about.employment_place_title")}
			</h3>
			<p className="about__places-desc">
				{placesData.map((place) => t(place)).join(", ")}{" "}
				{t("about.employment_place_desc")}
			</p>
		</div>
	);
};

export default About;
