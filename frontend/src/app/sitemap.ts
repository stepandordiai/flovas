import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { BASE_URL } from "@/lib/constants";
import { getVacancies } from "@/services/vacancies";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const now = new Date();

	const { data } = await getVacancies();
	const vacancies = data ?? [];

	// Helper to generate alternate language objects without trailing slashes
	const getAlternates = (path: string) => {
		const cleanPath = path ? `/${path}` : "";
		return {
			...Object.fromEntries(
				routing.locales.map((locale) => [
					locale,
					`${BASE_URL}/${locale}${cleanPath}`,
				]),
			),
			"x-default": `${BASE_URL}/${routing.defaultLocale}${cleanPath}`,
		};
	};

	// 1. Static Pages
	const localePages = routing.locales.flatMap((locale) =>
		pages.map((page) => {
			const cleanUrl = `${BASE_URL}/${locale}/${page.path}`.replace(/\/$/, "");
			return {
				url: cleanUrl,
				lastModified: now,
				changeFrequency: page.changeFrequency,
				priority: page.priority,
				alternates: {
					languages: getAlternates(page.path),
				},
			};
		}),
	);

	// 2. Dynamic Vacancy Pages
	const vacanciesLocalePages = routing.locales.flatMap((locale) =>
		vacancies.map((vacancy) => ({
			url: `${BASE_URL}/${locale}/prace/${vacancy.id}`,
			lastModified: now,
			changeFrequency: "weekly" as const,
			priority: 0.7,
			alternates: {
				languages: getAlternates(`prace/${vacancy.id}`),
			},
		})),
	);

	return [...localePages, ...vacanciesLocalePages];
}
