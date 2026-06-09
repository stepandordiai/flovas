export interface Lead {
	id: string;
	name: string;
	tel: string;
	address: string;
	position: string;
	message: string;
	status: string;
	gender: string;
	messengers: { name: string; isAvailable: boolean }[];
	created_at: Date;
}
