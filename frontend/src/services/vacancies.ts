import { supabase } from "@/lib/supabase";
import { VacancyInterface } from "@/interfaces/Vacancy";

export const getVacancies = async () => {
	const { data, error } = await supabase.from("vacancies").select("*");
	// TODO: learn this
	return { data: data as VacancyInterface[] | null, error };
};
