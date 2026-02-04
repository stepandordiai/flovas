import ScrollToTop from "@/app/utils/ScrollToTop";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import vacanciesData from "./../../../lib/data/vacancies-data.json";
import { VacancyInterface } from "@/app/interfaces/Vacancy";
import type { Metadata } from "next";
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
	const { id } = await params;

	const vacancy = vacancies.find((vacancy) => vacancy.id === id);

	if (!vacancy) {
		return notFound();
	}

	return (
		<>
			<ScrollToTop />
			<main className="vacancy-page">
				<div className="vacancy-page__top">
					<Link className="vacancy-page__top-link" href="/prace">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="currentColor"
							className="bi bi-arrow-left"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
							/>
						</svg>
						<span>Всі вакансії</span>
					</Link>
				</div>
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
