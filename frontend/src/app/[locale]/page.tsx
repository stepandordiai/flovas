import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "../interfaces/Locale";
import HomeClient from "./Home.client";
import About from "../components/home/About/About";
import Contacts from "../components/home/Contacts/Contacts";
import WebApp from "../components/home/WebApp/WebApp";
import ScrollToTopBtn from "@/app/components/ScrollToTopBtn/ScrollToTopBtn";
import "./Home.scss";

// TODO: learn this
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const baseUrl = "https://www.flovas.cz";

	return {
		title: `${t("homeMetaTitle")} | flovas`,
		description: t("homeMetaDesc"),
		alternates: {
			canonical: `${baseUrl}/${locale}`,
			languages: {
				uk: `${baseUrl}/uk`,
				cs: `${baseUrl}/cs`,
				sk: `${baseUrl}/sk`,
				en: `${baseUrl}/en`,
				"x-default": `${baseUrl}/uk`,
			},
		},
	};
}

export default async function Home() {
	return (
		<main className="main home" id="home">
			<div className="home-inner">
				<HomeClient />
				<About />
				<Contacts />
				<WebApp />
				<ScrollToTopBtn />
			</div>
		</main>
	);
}
