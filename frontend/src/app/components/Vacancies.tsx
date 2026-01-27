import Vacancy from "./Vacancy/Vacancy";
import { getVacanciesData } from "@/app/lib/api/api";
import { VacancyInterface } from "@/app/interfaces/Vacancy";

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default async function VacanciesSection() {
	// await sleep(3000);

	const vacancies =
		await getVacanciesData<VacancyInterface[]>("/api/vacancies");

	return (
		<div className="vacancies-container">
			{vacancies
				.slice()
				.reverse()
				.map((vacancy, index) => (
					<Vacancy key={index} vacancy={vacancy} />
				))}
		</div>
	);
}
