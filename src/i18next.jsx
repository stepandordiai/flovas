import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import uk from "./translations/uk/translation.json";
import cs from "./translations/cs/translation.json";
import sk from "./translations/sk/translation.json";
import en from "./translations/en/translation.json";

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		resources: {
			uk: {
				translation: uk,
			},
			cs: {
				translation: cs,
			},
			sk: {
				translation: sk,
			},
			en: {
				translation: en,
			},
		},

		fallbackLng: "uk",

		detection: {
			order: ["localStorage", "cookie", "htmlTag", "path", "subdomain"],

			caches: ["localStorage", "cookie"],
		},

		interpolation: {
			escapeValue: false,
		},
	});
