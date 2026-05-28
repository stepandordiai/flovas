export interface Vacancy {
	id: string;
	// URL from Supabase Storage
	img: string | null;
	is_active: boolean;
	place: string;
	address: string;
	address_url: string;
	title: string;
	description: string;
	benefits: string[];
	salary: number;
	requirements: string[] | null;
	responsibilities: string[] | null;
	job_type: string;
	updated_at: string;
	hot_vacancy: boolean;
	badges: string[] | null;
}

export interface VacancyForm extends Omit<Vacancy, "img" | "updated_at"> {
	// local file before upload
	img: File | null;
	current_img: string | null;
}
