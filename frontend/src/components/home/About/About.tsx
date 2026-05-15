import { getTranslations } from "next-intl/server";
import { getVacancies } from "@/services/vacancies";
import Image from "next/image";
import "./About.scss";

const benefitsData = [
	{ img: "/icons/czech.png", title: "about.our_advantages1" },
	{ img: "/icons/people.png", title: "about.our_advantages2" },
	{ img: "/icons/money.png", title: "about.our_advantages3" },
	{ img: "/icons/accommodation.png", title: "about.our_advantages4" },
	{ img: "/icons/hiring.png", title: "about.our_advantages5" },
	{ img: "/icons/documents.png", title: "about.our_advantages6" },
	{ img: "/icons/insurance.png", title: "about.our_advantages7" },
	{ img: "/icons/free.png", title: "about.our_advantages8" },
	{ img: "/icons/hour.png", title: "about.our_advantages9" },
	{ img: "/icons/bus.png", title: "about.our_advantages10" },
	{ img: "/icons/support.png", title: "about.our_advantages11" },
	{ img: "/icons/misunderstanding.png", title: "about.our_advantages12" },
	{ img: "/icons/moving.png", title: "about.our_advantages13" },
];

export default async function About() {
	const t = await getTranslations();

	const { data, error } = await getVacancies();
	const vacancies = data ?? [];

	console.log(error);

	return (
		<section className="about" id="o-nas">
			<h2 className="about__title">{t("about_title")}</h2>
			<p className="about__desc">{t("about.desc")}</p>
			<ul className="about-milestones">
				<li>
					<strong>{vacancies.length}</strong>
					<span>Вакансій по всій Чехії</span>
				</li>
				<li>
					<strong>20+</strong>
					<span>Років досвіду</span>
				</li>
				<li>
					<strong>1000+</strong>
					<span>Українцям допомогли працевлаштуватись</span>
				</li>
			</ul>
			<h3 className="about__places-title">
				{t("about.employment_place_title")}
			</h3>
			<div className="about__places-desc">
				{[...new Set(vacancies.map((vacancy) => vacancy.place))].map(
					(place, i) => {
						return (
							<div key={i} className="about__place">
								{place}
							</div>
						);
					},
				)}
			</div>
			<h3 className="about__benefits-title">
				{t("about.our_advantages_title")}
			</h3>
			<ul className="about__benefits-list">
				{benefitsData.map((benefit, index) => {
					return (
						<li key={index} className="about__benefits-item">
							<Image src={benefit.img} width={50} height={50} alt="" />
							<span>{t(benefit.title)}</span>
						</li>
					);
				})}
			</ul>
			<h3 className="about__goal-title">{t("about.goal_title")}</h3>
			<p className="about__goal-desc">{t("about.goal_desc")}</p>
		</section>
	);
}
