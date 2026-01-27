import Vacancy from "./Vacancy/Vacancy";
import { fetchVacancies } from "../lib/api/vacancies";

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default async function VacanciesSection() {
	// await sleep(3000);

	const vacancies = await fetchVacancies();

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
