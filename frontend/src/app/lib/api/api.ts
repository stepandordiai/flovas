import axios from "axios";

// TODO: LEARN THIS
const api = axios.create({
	baseURL: process.env.NEXT_API_URL,
});

export async function getVacanciesData<T>(endpoint: string): Promise<T> {
	// await new Promise((resolve) => setTimeout(resolve, 6000));
	const res = await api.get<T>(endpoint);
	return res.data;
}
