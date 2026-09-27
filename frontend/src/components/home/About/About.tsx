import { getTranslations } from "next-intl/server";
import { getVacanciesFiltered } from "@/services/vacancies";
import { Link } from "@/i18n/navigation";
import "./About.scss";

const benefits = [
	"about.our_advantages1",
	"about.our_advantages2",
	"about.our_advantages3",
	"about.our_advantages4",
	"about.our_advantages5",
	"about.our_advantages6",
	"about.our_advantages7",
	"about.our_advantages8",
	"about.our_advantages9",
	"about.our_advantages10",
	"about.our_advantages11",
	"about.our_advantages12",
	"about.our_advantages13",
];

export default async function About() {
	const t = await getTranslations();

	const { places, count } = await getVacanciesFiltered();

	return (
		<section className="about" id="o-nas">
			<h2 className="about__title">{t("about_title")}</h2>
			<p className="about__desc">{t("about.desc")}</p>
			<ul className="about-milestones">
				<li>
					<strong>{count}</strong>
					<span>{t("about.vacanciesAcrossTheCzechRepublic")}</span>
				</li>
				<li>
					<strong>20+</strong>
					<span>{t("about.yearsOfExperience")}</span>
				</li>
				<li>
					<strong>1000+</strong>
					<span>{t("about.ukrainiansHelpedFindEmployment")}</span>
				</li>
			</ul>
			<h3 className="about__places-title">
				{t("about.employment_place_title")}
			</h3>
			<div className="about__places-desc">
				{places.map((place, i) => {
					return (
						<Link
							key={i}
							href={{
								pathname: "/prace",
								query: { place },
							}}
							className="about__place"
						>
							{place}
						</Link>
					);
				})}
			</div>
			<h3 className="about__benefits-title">
				{t("about.our_advantages_title")}
			</h3>
			<ul className="about__benefits-list">
				{benefits.map((benefit, index) => {
					return (
						<li key={index} className="about__benefits-item">
							<span>{index + 1}</span>
							<span>{t(benefit)}</span>
						</li>
					);
				})}
			</ul>
			<h3 className="about__goal-title">{t("about.goal_title")}</h3>
			<p className="about__goal-desc">{t("about.goal_desc")}</p>
		</section>
	);
}
