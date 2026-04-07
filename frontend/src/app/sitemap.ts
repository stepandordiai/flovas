import type { MetadataRoute } from "next";
import vacancies from "@/data/vacancies.json";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.flovas.cz";
const pages = [
	{
		path: "",
		priority: 1,
		changeFrequency: "weekly",
	},
	{
		path: "prace",
		priority: 0.8,
		changeFrequency: "weekly",
	},
	{
		path: "gdpr",
		priority: 0.1,
		changeFrequency: "never",
	},
] as const;

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
			url: `${BASE_URL}/${locale}/${page.path}`.replace(/\/$/, ""),
			lastModified: now,
			changeFrequency: page.changeFrequency,
			priority: page.priority,
			alternates: {
				languages: alternates(page ? `/${page}` : ""),
			},
		})),
	);

	const vacanciesLocalePages = routing.locales.flatMap((locale) =>
		vacancies.map((vacancy) => ({
			url: `${BASE_URL}/${locale}/prace/${vacancy.id}`,
			lastModified: now,
			changeFrequency: "weekly" as const,
			priority: 0.7,
			alternates: {
				languages: alternates(`/prace/${vacancy.id}`),
			},
		})),
	);

	return [...localePages, ...vacanciesLocalePages];
}
