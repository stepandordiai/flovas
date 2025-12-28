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

const benefitsData = [
	{ img: mapIcon, title: "about.our_advantages1" },
	{ img: peopleIcon, title: "about.our_advantages2" },
	{ img: moneyIcon, title: "about.our_advantages3" },
	{ img: accommodationIcon, title: "about.our_advantages4" },
	{ img: hiringIcon, title: "about.our_advantages5" },
	{ img: documentsIcon, title: "about.our_advantages6" },
	{ img: insuranceIcon, title: "about.our_advantages7" },
	{ img: freeIcon, title: "about.our_advantages8" },
	{ img: hourIcon, title: "about.our_advantages9" },
	{ img: busIcon, title: "about.our_advantages10" },
	{ img: supportIcon, title: "about.our_advantages11" },
	{ img: misunderstandingIcon, title: "about.our_advantages12" },
	{ img: movingIcon, title: "about.our_advantages13" },
];

const About = ({ placesData, vacanciesData }) => {
	const { t } = useTranslation();

	return (
		<section className="about" id="about">
			<h2 className="about__title">{t("about_title")}</h2>
			<p className="about__desc">{t("about.desc")}</p>
			<div className="about-milestones">
				<div>
					<span>{vacanciesData.length}</span>
					<span>Вакансій</span>
				</div>
				<div>
					<span>20+</span>
					<span>Років досвіду</span>
				</div>
				<div>
					<span>1000+</span>
					<span>Українцям допомогли працевлаштуватись</span>
				</div>
			</div>
			<h3 className="about__places-title">
				{t("about.employment_place_title")}
			</h3>
			<p className="about__places-desc">
				{placesData.map((place) => t(place)).join(", ")}{" "}
				{t("about.employment_place_desc")}
			</p>
			<h3 className="about__benefits-title">
				{t("about.our_advantages_title")}
			</h3>
			<ul className="about__benefits-list">
				{benefitsData.map((benefit, index) => {
					return (
						<li key={index} className="about__benefits-item">
							<img src={benefit.img} width={50} height={50} alt="" />
							<span>{t(benefit.title)}</span>
						</li>
					);
				})}
			</ul>
			<h3 className="about__goal-title">{t("about.goal_title")}</h3>
			<p className="about__goal-desc">{t("about.goal_desc")}</p>
		</section>
	);
};

export default About;
