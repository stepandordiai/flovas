import "./Home.scss";

interface Lead {
	id: string;
	name: string;
	tel: string;
	address: string;
	position: string;
	message: string;
}

export interface Vacancy {
	id: string;
	img: string;
	is_active: boolean;
	place: string;
	address: string;
	address_url: string;
	title: string;
	description: string[];
	salary: number;
	requirements: string[] | null;
	responsibilities: string[] | null;
	job_type: string;
	updated_at: string;
	hot_vacancy: boolean;
}

type HomeProps = {
	leads: Lead[];
	vacancies: Vacancy[];
};

const Home = ({ leads, vacancies }: HomeProps) => {
	const uniqueVacanciesPlaces = [...new Set(vacancies.map((v) => v.place))];

	return (
		<main className="main">
			<h1 className="main__title">Головна</h1>
			<h2>Вакансії</h2>
			<div className="home-inner">
				<div className="home-container">
					<p>Всіх вакансій</p>
					<p>{vacancies.length}</p>
				</div>
				<div className="home-container">
					<p>Активних вакансій</p>
					<p>
						{vacancies.filter((v) => v.is_active).length}/{vacancies.length}
					</p>
				</div>
				<div className="home-container">
					<p>Гарячих вакансій</p>
					<p>{vacancies.filter((v) => v.hot_vacancy).length}</p>
				</div>
				{uniqueVacanciesPlaces.map((p) => {
					const vacanciesInPlace = vacancies.filter((v) => v.place === p);
					return (
						<div className="home-container">
							<p>Вакансій в {p}</p>
							<p>{vacanciesInPlace.length}</p>
						</div>
					);
				})}
			</div>
			<h2>Ліди</h2>
			<div className="home-inner">
				<div className="home-container">
					<p>Всіх лідів</p>
					<p>{leads.length}</p>
				</div>
			</div>
		</main>
	);
};

export default Home;
