import type { Metadata } from "next";
import About from "../components/home/About/About";
import Contacts from "../components/home/Contacts/Contacts";
import WebApp from "../components/home/WebApp/WebApp";
import ScrollToTopBtn from "@/app/components/ScrollToTopBtn/ScrollToTopBtn";
import HomeClient from "./Home.client";
import { getTranslations } from "next-intl/server";
import type { Locale } from "../interfaces/Locale";
import "./Home.scss";

// TODO: LEARN THIS
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return {
		title: `${t("homeMetaTitle")} | flovas`,
		description: t("homeMetaDesc"),
	};
}

export default async function Home() {
	const t = await getTranslations();

	return (
		<>
			<main className="home" id="home">
				<div className="home-inner">
					<HomeClient />
					<About />
					<Contacts />
					<WebApp />
					<ScrollToTopBtn />
				</div>
			</main>
		</>
	);
}
