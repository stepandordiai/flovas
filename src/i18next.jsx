import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import uk from "./assets/translations/uk/translation.json";
import cs from "./assets/translations/cs/translation.json";
import sk from "./assets/translations/sk/translation.json";
import en from "./assets/translations/en/translation.json";

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
