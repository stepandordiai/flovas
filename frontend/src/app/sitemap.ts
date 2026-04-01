import type { MetadataRoute } from "next";
import vacancies from "@/data/vacancies.json";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.flovas.cz";
const pages = ["", "prace", "gdpr"];

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	const alternates = (path: string) => ({
		...Object.fromEntries(
			routing.locales.map((locale) => [locale, `${BASE_URL}/${locale}${path}`]),
		),
		"x-default": `${BASE_URL}/${routing.defaultLocale}${path}`,
	});

	const localePages = routing.locales.flatMap((locale) =>
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

	const vacanciesLocalePages = routing.locales.flatMap((locale) =>
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
