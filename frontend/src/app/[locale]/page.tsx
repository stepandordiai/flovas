import type { Metadata } from "next";
import About from "../components/About/About";
import Contacts from "../components/Contacts/Contacts";
import WebApp from "../components/WebApp/WebApp";
import ScrollToTopBtn from "@/app/components/ScrollToTopBtn/ScrollToTopBtn";
// import HomeClient from "./Home.client";
import HomeClient from "./Home.client";
import { getTranslations } from "next-intl/server";
// import { Suspense } from "react";
// import { Link } from "@/i18n/navigation";
// import VacanciesSection from "../components/Vacancies";
import type { Locale } from "../interfaces/Locale";
import "./Vacancies.scss";
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

// TODO: learn this
// function VacanciesLoading({ text }: { text: string }) {
// 	return (
// 		<div className="vacancies-loading">
// 			{/* FIXME: */}
// 			<div className="vacancies-loading__circle">
// 				<span></span>
// 			</div>
// 			<p>{text}</p>
// 		</div>
// 	);
// }

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
