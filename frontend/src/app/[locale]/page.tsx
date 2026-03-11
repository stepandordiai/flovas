import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "../interfaces/Locale";
import HomeClient from "./Home.client";
import About from "../components/home/About/About";
import Contacts from "../components/home/Contacts/Contacts";
import WebApp from "../components/home/WebApp/WebApp";
import ScrollToTopBtn from "@/app/components/ScrollToTopBtn/ScrollToTopBtn";
import "./Home.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	const locales = ["uk", "cs", "sk", "en"];

	const alternates = Object.fromEntries(locales.map((l) => [l, `/${l}`]));

	return {
		title: `${t("homeMetaTitle")} | flovas`,
		description: t("homeMetaDesc"),
		alternates: {
			canonical: `/${locale}`,
			languages: {
				...alternates,
				"x-default": "/uk",
			},
		},
	};
}

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return (
		<main className="main home" id="home">
			<div className="home-inner">
				<HomeClient />
				<About />
				<Contacts />
				<WebApp locale={locale} />
				<ScrollToTopBtn />
			</div>
		</main>
	);
}
