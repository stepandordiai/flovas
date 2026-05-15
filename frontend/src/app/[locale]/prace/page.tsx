import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import VacanciesClient from "./VacanciesClient";
import { getVacancies } from "@/services/vacancies";
import "./Vacancies.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "vacancies.meta" });
	const page = "prace";
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${page}`]),
	);

	return {
		title: `${t("title")} | flovas`,
		description: `${t("description")}`,
		alternates: {
			canonical: `/${locale}/${page}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}/${page}`,
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

	const { data, error } = await getVacancies();
	const vacancies = data ?? [];

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
				<VacanciesClient vacancies={vacancies} />
			</main>
		</>
	);
}
