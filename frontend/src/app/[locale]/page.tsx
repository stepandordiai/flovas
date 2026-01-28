import type { Metadata } from "next";
import About from "../components/About/About";
import Contacts from "../components/Contacts/Contacts";
import WebApp from "../components/WebApp/WebApp";
import ScrollToTopBtn from "@/app/components/ScrollToTopBtn/ScrollToTopBtn";
import HomeClient from "./Home.client";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Link } from "@/i18n/navigation";
import VacanciesSection from "../components/Vacancies";
import type { Locale } from "../interfaces/Locale";
import { fetchVacancies } from "../lib/api/vacancies";
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

const vacancies = await fetchVacancies();

// TODO: learn this
function VacanciesLoading({ text }: { text: string }) {
	return (
		<div className="vacancies-loading">
			{/* FIXME: */}
			<div className="vacancies-loading__circle">
				<span></span>
			</div>
			<p>{text}</p>
		</div>
	);
}

export default async function Home() {
	const t = await getTranslations();

	return (
		<>
			<main className="home" id="home">
				<div className="home-inner">
					<div className="home-inner-container">
						<section className="home-top">
							<HomeClient />
							<div className="home__link-container">
								<Link className="home__link" href="/#contacts">
									{t("contact_us_title")}
								</Link>
								<Link className="home__link" href="/#vacancies">
									{t("vacancies_title")}
									<span className="home__link-vacancies-qty">
										{vacancies.length}
									</span>
								</Link>
							</div>
						</section>
						<section className="vacancies" id="vacancies">
							<h2 className="vacancies__title">{t("vacancies_title")}</h2>
							<Suspense
								fallback={
									<VacanciesLoading
										text={`${t("vacancies_r_loading")}. (~30 ${t("sec")}.)`}
									/>
								}
							>
								<VacanciesSection />
							</Suspense>
						</section>
					</div>
					<About />
					<Contacts />
					<WebApp />
					<ScrollToTopBtn />
				</div>
			</main>
		</>
	);
}
