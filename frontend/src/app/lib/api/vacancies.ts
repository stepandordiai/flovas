import { VacancyInterface } from "@/app/interfaces/Vacancy";

const API_BASE_URL = "https://flovas-crud.onrender.com/api/vacancies";

export async function fetchVacancies(): Promise<VacancyInterface[]> {
	const res = await fetch(API_BASE_URL);
	return res.json();
}
