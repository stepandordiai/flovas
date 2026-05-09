import { supabase } from "@/lib/supabase";

export const getVacancies = async () => {
	const { data, error } = await supabase.from("vacancies").select("*");
	return { data, error };
};
