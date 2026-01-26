import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://www.flovas.cz",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
	];
}
