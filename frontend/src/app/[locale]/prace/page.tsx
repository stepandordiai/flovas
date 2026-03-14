import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Vacancy from "@/app/components/Vacancy/Vacancy";
import vacancies from "./../../lib/data/vacancies.json";
import ScrollToTopBtn from "@/app/components/ScrollToTopBtn/ScrollToTopBtn";
import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
import "./Vacancies.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	const locales = ["uk", "cs", "sk", "en"];

	const alternates = Object.fromEntries(locales.map((l) => [l, `/${l}/prace`]));

	return {
		title: `${t("vacanciesMetaTitle")} | flovas`,
		description: `${t("vacanciesMetaDesc")}`,
		alternates: {
			canonical: `/${locale}/prace`,
			languages: {
				...alternates,
				"x-default": "/uk/prace",
			},
		},
	};
}

export default async function Vacancies({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: t("vacancies_title"),
		url: `https://www.flovas.cz/${locale}/prace`,
		itemListElement: vacancies.map((vacancy, i) => ({
			"@type": "ListItem",
			position: i + 1,
			url: `https://www.flovas.cz/${locale}/prace/${vacancy.id}`,
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
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
		</>
	);
}
