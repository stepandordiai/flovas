import { supabase } from "@/lib/supabase";
import { VacancyInterface } from "@/interfaces/Vacancy";

// TODO: LEARN THIS
export async function getVacancies(filters?: {
	place?: string;
	job_type?: string;
}) {
	let query = supabase.from("vacancies").select("*");

	if (filters?.place) query = query.eq("place", filters.place);
	if (filters?.job_type) query = query.eq("job_type", filters.job_type);

	const { data, error } = await query;
	return { data, error };
}

// TODO: LEARN THIS
export async function getVacanciesFiltered() {
	const { data, error } = await supabase
		.from("vacancies")
		.select("place, job_type");

	if (error || !data) return { places: [], jobTypes: [], count: 0 };

	return {
		places: [...new Set(data.map((v) => v.place))],
		jobTypes: [...new Set(data.map((v) => v.job_type))],
		count: data.length,
	};
}

export async function getVacancyById(id: string) {
	const { data, error } = await supabase
		.from("vacancies")
		.select("*")
		.eq("id", id)
		.single();

	return { data: data as VacancyInterface | null, error };
}
