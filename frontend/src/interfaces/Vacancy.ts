export interface VacancyInterface {
	id: string;
	img?: string;
	isActive: boolean;
	createdAt: string;
	place: string;
	address?: string;
	addressUrl?: string;
	title: string;
	desc: string[];
	salary: number;
	requirements?: string[];
	responsibilities?: string[];
	jobType: string;
}
