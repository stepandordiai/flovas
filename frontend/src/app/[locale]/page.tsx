import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/interfaces/Locale";
import HomeClient from "./Home.client";
import About from "@/components/home/About/About";
import Contacts from "@/components/home/Contacts/Contacts";
import WebApp from "@/components/home/WebApp/WebApp";
import ScrollToTopBtn from "@/components/ScrollToTopBtn/ScrollToTopBtn";
import { getVacancies } from "@/services/vacancies";
import Faqs from "@/components/Faqs/Faqs";
import { Link } from "@/i18n/navigation";
import Vacancy from "@/components/Vacancy/Vacancy";
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
		title: `${t("title")}`,
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
	const t = await getTranslations({ locale });

	const { data: vacancies } = await getVacancies();

	return (
		<main className="main home" id="uvod">
			<div className="home-inner">
				<div className="home-inner-container">
					<section className="home-top" id="hero">
						<div className="home-top-inner">
							<h1 className="hero__heading">{t("home.heading")}</h1>
							<p className="hero__subheading">{t("home.subheading")}</p>
							<HomeClient vacancies={vacancies ?? []} />
						</div>
						<div className="home__link-container">
							<a className="home__link" href="#kontakty">
								{t("contact_us_title")}
							</a>
							<Link className="home__link" href="/prace">
								{t("home.allVacancies")}
								{vacancies && (
									<span className="home__link-vacancies-qty">
										{vacancies.length}
									</span>
								)}
							</Link>
						</div>
					</section>
					<section className="vacancies" id="prace">
						<h2 className="vacancies__title">{t("hotVacanciesTitle")} 🔥</h2>
						<div className="vacancies-container">
							{[...(vacancies ?? [])]
								.sort(
									(a, b) =>
										new Date(b.updated_at).getTime() -
										new Date(a.updated_at).getTime(),
								)
								.filter((vacancy) => vacancy.hot_vacancy)
								.map((vacancy, index) => (
									<Vacancy
										key={vacancy.id}
										vacancy={vacancy}
										index={index}
										priorityLength={4}
									/>
								))}
						</div>
						<Link className="vacancies__link" href="/prace">
							Дивитись всі вакансії
						</Link>
					</section>
				</div>
				<About />
				<Faqs />
				<Contacts />
				<WebApp locale={locale} />
				<div className="scroll-to-top-btn-wrapper">
					<ScrollToTopBtn />
				</div>
			</div>
		</main>
	);
}
