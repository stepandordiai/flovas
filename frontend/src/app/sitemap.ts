import type { MetadataRoute } from "next";

const BASE_URL = "https://www.flovas.cz";
const locales = ["uk", "cs", "sk", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	const alternates: Record<string, string> = {
		uk: `${BASE_URL}/uk`,
		cs: `${BASE_URL}/cs`,
		sk: `${BASE_URL}/sk`,
		en: `${BASE_URL}/en`,
		"x-default": `${BASE_URL}/uk`,
	};

	return locales.map((locale) => ({
		url: `${BASE_URL}/${locale}`,
		lastModified: now,
		alternates: {
			languages: alternates,
		},
	}));
}
