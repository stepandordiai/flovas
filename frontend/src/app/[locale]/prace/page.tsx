import { getTranslations } from "next-intl/server";
import ScrollToTop from "@/app/utils/ScrollToTop";
import Vacancy from "@/app/components/Vacancy/Vacancy";
import vacanciesData from "./../../lib/data/vacancies-data.json";
import { VacancyInterface } from "@/app/interfaces/Vacancy";
import ScrollToTopBtn from "@/app/components/ScrollToTopBtn/ScrollToTopBtn";
import { Link } from "@/i18n/navigation";
import "./Vacancies.scss";

const vacancies: VacancyInterface[] = vacanciesData;

export default async function Vacancies() {
	const t = await getTranslations();

	return (
		<>
			<ScrollToTop />
			<main className="vacancies-page">
				<div className="vacancies-page-inner">
					<Link href="/">{t("home_title")}</Link>
					<h2 className="vacancies-page__title">{t("vacancies_title")}</h2>
					<div className="vacancies-page-container">
						{vacancies.map((vacancy, index) => (
							<Vacancy key={index} vacancy={vacancy} />
						))}
					</div>
					<ScrollToTopBtn />
				</div>
			</main>
		</>
	);
}
