import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { fetchVacancies } from "@/app/lib/api/vacancies";
import "./VacancyPage.scss";

// TODO: LEARN THIS
export async function generateStaticParams() {
	const vacancies = await fetchVacancies();

	const locales = ["uk", "cs", "sk", "en"];

	return locales.flatMap((locale) =>
		vacancies.map((vacancy) => ({
			locale,
			id: String(vacancy._id),
		})),
	);
}

type VacancyPageProps = {
	params: Promise<{ id: string }>;
};

export default async function VacancyPage({ params }: VacancyPageProps) {
	const { id } = await params;

	const vacancies = await fetchVacancies();

	const vacancy = vacancies.find((vacancy) => vacancy._id === String(id));

	if (!vacancy) {
		return notFound();
	}

	return (
		<>
			<main className="vacancy-page">
				<div className="vacancy-page__top">
					<Link className="vacancy-page__top-link" href="/#vacancies">
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
					<div style={{ display: "flex", flexDirection: "column", rowGap: 10 }}>
						<p className="vacancy__date">
							Опубліковано: {vacancy.updatedAt.slice(0, 10)}
						</p>
						<p>📍 {vacancy.place}</p>
						<p style={{ fontWeight: 500 }}>{vacancy.title}</p>
						<p style={{ whiteSpace: "pre-wrap" }}>{vacancy.desc}</p>
					</div>
					<a className="vacancy-page__link" href="tel:+420777957290"></a>
				</div>
			</main>
		</>
	);
}
