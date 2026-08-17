import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import VacanciesClient from "./VacanciesClient";
import { getVacancies, getVacanciesFiltered } from "@/services/vacancies";
import { BASE_URL } from "@/lib/constants";
import "./Vacancies.scss";

const PAGE = "prace";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "vacancies.meta" });
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${PAGE}`]),
	);

	return {
		title: `${t("title")}`,
		description: `${t("description")}`,
		alternates: {
			canonical: `/${locale}/${PAGE}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}/${PAGE}`,
			},
		},
	};
}

type VacanciesProps = {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{ place?: string; job_type?: string }>;
};

export default async function Vacancies({
	params,
	searchParams,
}: VacanciesProps) {
	const { locale } = await params;
	const { place, job_type } = await searchParams;
	const t = await getTranslations({ locale });

	// TODO: LEARN THIS
	const [{ data, error }, { places, jobTypes }] = await Promise.all([
		getVacancies({ place, job_type }),
		getVacanciesFiltered(),
	]);

	if (error) console.error("Failed to load vacancies:", error.message);
	const vacancies = data ?? [];

	// TODO: learn this
	// ItemList
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: t("vacancies_title"),
		url: `${BASE_URL}/${locale}/prace`,
		itemListElement: vacancies.map((vacancy, i) => ({
			"@type": "ListItem",
			position: i + 1,
			url: `${BASE_URL}/${locale}/prace/${vacancy.id}`,
			name: vacancy.title,
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<main className="main vacancies-page">
				<VacanciesClient
					vacancies={vacancies}
					places={places}
					jobTypes={jobTypes}
					initPlace={place}
					initJobType={job_type}
				/>
			</main>
		</>
	);
}
