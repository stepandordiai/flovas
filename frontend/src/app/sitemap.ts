import type { MetadataRoute } from "next";
import vacanciesData from "./lib/data/vacancies-data.json";
import { VacancyInterface } from "./interfaces/Vacancy";

const vacancies: VacancyInterface[] = vacanciesData;
const BASE_URL = "https://www.flovas.cz";
const locales = ["uk", "cs", "sk", "en"] as const;
const pages = ["", "prace"];

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	// TODO: LEARN THIS
	const alternates = (path: string) => ({
		...Object.fromEntries(
			locales.map((locale) => [locale, `${BASE_URL}/${locale}${path}`]),
		),
		"x-default": `${BASE_URL}/uk${path}`,
	});

	const localePages = locales.flatMap((locale) =>
		pages.map((page) => ({
			url: `${BASE_URL}/${locale}/${page}`.replace(/\/$/, ""),
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: page === "" ? 1 : 0.9,
			alternates: {
				languages: alternates(page ? `/${page}` : ""),
			},
		})),
	);

	const vacanciesLocalePages = locales.flatMap((locale) =>
		vacancies.map((vacancy) => ({
			url: `${BASE_URL}/${locale}/prace/${vacancy.id}`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.8,
			alternates: {
				languages: alternates(`/prace/${vacancy.id}`),
			},
		})),
	);

	return [...localePages, ...vacanciesLocalePages];
}
