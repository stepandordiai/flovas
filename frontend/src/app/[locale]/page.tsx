import type { Metadata } from "next";
import About from "../components/About/About";
import Contacts from "../components/Contacts/Contacts";
import WebApp from "../components/WebApp/WebApp";
import ScrollToTopBtn from "@/app/components/ScrollToTopBtn/ScrollToTopBtn";
import HomeClient from "./Home.client";
import styles from "./page.module.scss";
import { VacancyInterface } from "@/app/interfaces/Vacancy";
import { getVacanciesData } from "@/app/lib/api/api";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import VacanciesSection from "../components/Vacancies";
import "./Vacancies.scss";

export const metadata: Metadata = {
	title: "Працевлаштування в Чехії для українців | flovas",
	description:
		"Робота в Чехії для українців. FLOVAS s.r.o. — кадрова агенція з легальним працевлаштуванням, житлом і допомогою з документами по всій Чехії.",
	alternates: {
		canonical: "https://www.flovas.cz/",
	},
};

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
	const vacancies =
		await getVacanciesData<VacancyInterface[]>("/api/vacancies");

	return (
		<>
			<main className={styles.home} id="home">
				<div className={styles["home-inner"]}>
					<div className={styles["home-inner-container"]}>
						<HomeClient vacancies={vacancies} />
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
