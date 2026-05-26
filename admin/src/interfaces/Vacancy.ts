export interface Vacancy {
	id: string;
	img: string;
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
