import ScrollToTop from "@/app/utils/ScrollToTop";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import vacanciesData from "./../../../lib/data/vacancies-data.json";
import { VacancyInterface } from "@/app/interfaces/Vacancy";
import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
import "./VacancyPage.scss";

const vacancies: VacancyInterface[] = vacanciesData;

// TODO: LEARN THIS
export async function generateStaticParams() {
	const locales = ["uk", "cs", "sk", "en"];

	return locales.flatMap((locale) =>
		vacancies.map((vacancy) => ({
			locale,
			id: String(vacancy.id),
		})),
	);
}

// TODO: LEARN THIS
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
	const { locale, id } = await params;
	const BASE_URL = "https://www.flovas.cz";
	const locales = ["uk", "cs", "sk", "en"];

	const vacancy = vacancies.find((vacancy) => vacancy.id === id);

	if (!vacancy) {
		return {};
	}

	const alternates = Object.fromEntries(
		locales.map((l) => [l, `${BASE_URL}/${l}${id}`]),
	);

	return {
		title: vacancy.title,
		description: vacancy.desc.slice(0, 160),

		alternates: {
			canonical: `${BASE_URL}/${locale}/${id}`,
			languages: {
				...alternates,
				"x-default": `${BASE_URL}/uk/${id}`,
			},
		},
	};
}

type VacancyPageProps = {
	params: Promise<{ id: string }>;
};

export default async function VacancyPage({ params }: VacancyPageProps) {
	const t = await getTranslations();

	const { id } = await params;

	const vacancy = vacancies.find((vacancy) => vacancy.id === id);

	if (!vacancy) {
		return notFound();
	}

	return (
		<>
			<ScrollToTop />
			<main className="main vacancy-page">
				<Breadcrumbs
					links={[
						{ label: t("vacancies_title"), href: "/prace" },
						{ label: vacancy.title },
					]}
				/>
				<div className="vacancy-page__details">
					{vacancy.img ? (
						<img
							className="vacancy-page__img"
							src={vacancy.img}
							alt=""
							loading="lazy"
						/>
					) : (
						<div className="vacancy-page__no-img"></div>
					)}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							rowGap: 10,
						}}
					>
						<h1 className="vacancy__title">{vacancy.title}</h1>
						<p className="vacancy__created-at">
							Опубліковано: {vacancy.createdAt}
						</p>
						<p style={{ fontWeight: 600 }}>📍 {vacancy.place}</p>
						<p style={{ whiteSpace: "pre-wrap" }}>{vacancy.desc}</p>
						<a className="vacancy-page__link" href="tel:+420777957290">
							Дзвоніть зараз
						</a>
					</div>
				</div>
			</main>
		</>
	);
}
