import type { MetadataRoute } from "next";
import vacanciesData from "./lib/data/vacancies-data.json";
import { VacancyInterface } from "./interfaces/Vacancy";

const vacancies: VacancyInterface[] = vacanciesData;
const BASE_URL = "https://www.flovas.cz";
const locales = ["uk", "cs", "sk", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	// TODO: LEARN THIS
	const alternates = (path: string) =>
		Object.fromEntries(
			locales.map((locale) => [locale, `${BASE_URL}/${locale}${path}`]),
		);

	const localePages = locales.map((locale) => ({
		url: `${BASE_URL}/${locale}`,
		lastModified: now,
		alternates: {
			languages: alternates(""),
		},
	}));

	const vacanciesLocalePages = locales.flatMap((locale) =>
		vacancies.map((vacancy) => ({
			url: `${BASE_URL}/${locale}/${vacancy.id}`,
			lastModified: now,
			alternates: {
				languages: alternates(`/${vacancy.id}`),
			},
		})),
	);

	return [...localePages, ...vacanciesLocalePages];
}
