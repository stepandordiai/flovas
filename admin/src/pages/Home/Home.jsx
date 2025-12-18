import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Home.scss";

const Home = () => {
	const [vacanciesData, setVacanciesData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getVacanciesData = async () => {
		try {
			const response = await axios.get(import.meta.env.VITE_API_URL);
			setVacanciesData(response.data);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const removeVacancy = async (props) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL}/${props}`);
			setIsLoading(false);

			// Fetching data again after removing
			getVacanciesData();
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getVacanciesData();
	}, []);
	return (
		<>
			<p style={{ fontSize: "2rem" }}>Вакансії {vacanciesData.length}</p>
			<NavLink className={"home__link"} to={"/create-page"}>
				Створити вакансію
			</NavLink>
			<div className="home">
				<div className="vacancies-container">
					{isLoading ? (
						<div>Вакансії завантажуються, зачекайте будь-ласка...</div>
					) : (
						[...vacanciesData]
							// TODO:
							.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
							.map((vacancy) => {
								return (
									<div className="vacancy-container" key={vacancy._id}>
										<img src={vacancy.img} alt="" />
										<div className="vacancy-card__details">
											<p className="vacancy__date">
												Опубліковано: {vacancy.updatedAt.slice(0, 10)}
											</p>
											<p>
												<span style={{ fontWeight: 500 }}>Місто</span>:{" "}
												{vacancy.place}
											</p>
											<p style={{ fontWeight: 500 }}>{vacancy.title}</p>
											<p style={{ whiteSpace: "pre-wrap" }}>{vacancy.desc}</p>
											<p
												style={{
													color: vacancy.isActive ? "green" : "red",
												}}
											>
												{vacancy.isActive
													? "Вакансія активна"
													: "Вакансія неактивна"}
											</p>
										</div>
										<div className="vacancy-card__link-btn-container">
											<NavLink
												className={"vacancy-card__link"}
												to={`/edit-page/${vacancy._id}`}
											>
												Змінити
											</NavLink>
											<button
												className="vacancy-card__btn"
												onClick={() => removeVacancy(vacancy._id)}
											>
												Видалити
											</button>
										</div>
									</div>
								);
							})
					)}
				</div>
			</div>
		</>
	);
};

export default Home;
