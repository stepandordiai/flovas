import { getTranslations } from "next-intl/server";
import Vacancy from "@/app/components/Vacancy/Vacancy";
import vacanciesData from "./../../lib/data/vacancies-data.json";
import { VacancyInterface } from "@/app/interfaces/Vacancy";
import ScrollToTopBtn from "@/app/components/ScrollToTopBtn/ScrollToTopBtn";
import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
import type { Metadata } from "next";
import "./Vacancies.scss";

const vacancies: VacancyInterface[] = vacanciesData;

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const baseUrl = "https://www.flovas.cz";
	const { locale } = await params;

	return {
		title: "Вакансії | flovas",
		description: "",
		alternates: {
			canonical: `${baseUrl}/${locale}/prace`,
			languages: {
				uk: `${baseUrl}/uk/prace`,
				cs: `${baseUrl}/cs/prace`,
				en: `${baseUrl}/en/prace`,
				"x-default": `${baseUrl}/uk/prace`,
			},
		},
	};
}

export default async function Vacancies() {
	const t = await getTranslations();

	return (
		<main className="main vacancies-page">
			<Breadcrumbs links={[{ label: t("vacancies_title") }]} />
			<h1 className="vacancies-page__title">{t("vacancies_title")}</h1>
			<div className="vacancies-page-container">
				{vacancies.map((vacancy, index) => (
					<Vacancy key={index} vacancy={vacancy} />
				))}
			</div>
			<ScrollToTopBtn />
		</main>
	);
}
