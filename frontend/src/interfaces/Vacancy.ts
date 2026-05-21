export interface VacancyInterface {
	id: string;
	img?: string;
	is_active: boolean;
	updated_at: string;
	place: string;
	address?: string;
	address_url?: string;
	title: string;
	description: string[];
	salary: number;
	requirements?: string[];
	responsibilities?: string[];
	job_type: string;
	hot_vacancy: boolean;
	badges?: string[];
}
