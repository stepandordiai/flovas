import type { Vacancy } from "../../interfaces/Vacancy";
import type { Lead } from "../../interfaces/Lead";
import "./Home.scss";

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
				<div className="home-container">
					<p>К-сть лідів "Чоловік"</p>
					<p>{leads.filter((l) => l.gender === "Чоловік").length}</p>
				</div>
				<div className="home-container">
					<p>К-сть лідів "Жінка"</p>
					<p>{leads.filter((l) => l.gender === "Жінка").length}</p>
				</div>
				<div className="home-container">
					<p>К-сть лідів статус "Новий"</p>
					<p>{leads.filter((l) => l.status === "Новий").length}</p>
				</div>
				<div className="home-container">
					<p>К-сть лідів статус "Знайшов роботу"</p>
					<p>{leads.filter((l) => l.status === "Знайшов роботу").length}</p>
				</div>
				<div className="home-container">
					<p>К-сть лідів статус "Працює"</p>
					<p>{leads.filter((l) => l.status === "Працює").length}</p>
				</div>
				<div className="home-container">
					<p>К-сть лідів статус "Неактивний"</p>
					<p>{leads.filter((l) => l.status === "Неактивний").length}</p>
				</div>
			</div>
		</main>
	);
};

export default Home;
