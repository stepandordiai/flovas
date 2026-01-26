import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["uk", "cs", "sk", "en"],
	defaultLocale: "uk",
});
