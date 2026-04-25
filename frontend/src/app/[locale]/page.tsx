import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/interfaces/Locale";
import HomeClient from "./Home.client";
import About from "@/components/home/About/About";
import Contacts from "@/components/home/Contacts/Contacts";
import WebApp from "@/components/home/WebApp/WebApp";
import ScrollToTopBtn from "@/components/ScrollToTopBtn/ScrollToTopBtn";
import FAQ from "@/components/FAQ/FAQ";
import "./Home.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "home.meta" });

	const alternates = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}`]),
	);

	return {
		title: `${t("title")} | flovas`,
		description: t("description"),
		alternates: {
			canonical: `/${locale}`,
			languages: {
				...alternates,
				"x-default": `/${routing.defaultLocale}`,
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
		<main className="main home" id="uvod">
			<div className="home-inner">
				<HomeClient />
				<About />
				<FAQ />
				<Contacts />
				<WebApp locale={locale} />
				<div className="scroll-to-top-btn-wrapper">
					<ScrollToTopBtn />
				</div>
			</div>
		</main>
	);
}
