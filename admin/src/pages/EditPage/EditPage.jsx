import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Select from "react-select";
import placesData from "./../../data/places-data.json";
import imagesData from "./../../data/images-data.json";
import "./EditPage.scss";

const VacancyPage = () => {
	let { id } = useParams();

	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [vacancyData, setVacancyData] = useState({
		img: "",
		place: "",
		title: "",
		desc: "",
		isActive: true,
	});
	const [updatePreload, setUpdatePreload] = useState(false);

	const banner = useRef(null);

	useEffect(() => {
		const getVacancyData = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/${id}`
				);
				setVacancyData({
					img: response.data.img,
					place: response.data.place,
					title: response.data.title,
					desc: response.data.desc,
					isActive: response.data.isActive,
				});
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
			}
		};

		getVacancyData();
	}, []);

	const updateVacancyData = async (e) => {
		e.preventDefault();
		setUpdatePreload(true);

		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, vacancyData);
			// navigate("/");
		} catch (error) {
			console.error("Error updating product:", error);
		} finally {
			setUpdatePreload(false);
			banner.current &&
				banner.current.classList.add("edit-page__banner--active");

			setTimeout(() => {
				banner.current &&
					banner.current.classList.remove("edit-page__banner--active");
			}, 3000);
		}
	};

	// React select
	const [selectedOptions, setSelectedOptions] = useState([]);

	const handleSelectChange = (selected) => {
		setSelectedOptions(selected || createdOptions);
	};

	const getSelectedValues = () => {
		return selectedOptions.map((option) => option.value).join(", ");
	};

	useEffect(() => {
		setVacancyData({ ...vacancyData, place: getSelectedValues() });
	}, [selectedOptions]);

	// TODO:
	const defaultPlaces = vacancyData.place
		.split(",")
		.map((p) => p.trim())
		.map((p) => placesData.find((option) => option.value === p))
		.filter(Boolean); // remove undefined

	return (
		<>
			<div ref={banner} className="edit-page__banner">
				Вакансія оновлена!
			</div>
			<button className="create-page__link" onClick={() => navigate("/")}>
				Назад
			</button>
			<div className="create-page">
				<div className="edit-vacancy-inner">
					<p className="edit-page__title">Змінити вакансію</p>
					{vacancyData.img ? (
						<img className="create-page__img" src={vacancyData.img} alt="" />
					) : (
						<div className="edit-vacancy__no-img"></div>
					)}
					<p>Виберіть картинку для вакансії</p>
					<div className="edit-vacancy__thumb-img-container">
						{imagesData.map((img) => {
							return (
								<img
									key={img.id}
									onClick={() =>
										setVacancyData({
											...vacancyData,
											img: "https://flovas-admin.netlify.app" + img.imgSrc,
										})
									}
									src={img.imgSrc}
									alt=""
								/>
							);
						})}
					</div>
					{isLoading ? (
						"Вакансія завантажується, зачекайте будь-ласка..."
					) : (
						<form className="create-page__form" onSubmit={updateVacancyData}>
							<div className="input-container">
								<label>Картинка</label>
								<input
									type="text"
									value={vacancyData.img}
									onChange={(e) =>
										setVacancyData({ ...vacancyData, img: e.target.value })
									}
									placeholder="Додайте ссилку на картинку"
								/>
							</div>
							<div className="input-container">
								<div>
									<label htmlFor="">Місто</label>
									<Select
										className="custom-select"
										options={placesData}
										isMulti
										defaultValue={defaultPlaces}
										onChange={handleSelectChange}
										// onMenuOpen={handleMenuOpen}
										placeholder="Виберіть місто або декілька міст..."
									/>
								</div>
							</div>
							<div className="input-container">
								<label>Заголовок</label>
								<input
									defaultValue={vacancyData.title}
									onChange={(e) =>
										setVacancyData({ ...vacancyData, title: e.target.value })
									}
									placeholder={`Наприклад \"Столяр\"`}
									type="text"
								/>
							</div>
							<div className="input-container">
								<label>Опис</label>
								<textarea
									className="text-area"
									defaultValue={vacancyData.desc}
									onChange={(e) =>
										setVacancyData({ ...vacancyData, desc: e.target.value })
									}
									placeholder="Опис вакансії"
								></textarea>
							</div>
							<div>
								<input
									type="checkbox"
									name=""
									id="vacancy-check"
									onChange={(e) =>
										setVacancyData({
											...vacancyData,
											isActive: e.target.checked,
										})
									}
									checked={vacancyData.isActive}
								/>
								<label style={{ marginLeft: 5 }} htmlFor="vacancy-check">
									Активна вакансія
								</label>
							</div>
							<button
								style={
									updatePreload
										? { cursor: "not-allowed" }
										: { cursor: "pointer" }
								}
								className="create-page__form-btn"
								type="submit"
								disabled={updatePreload ? true : false}
							>
								{!updatePreload
									? "Зберегти вакансію"
									: "Зачекайте будь-ласка..."}
							</button>
						</form>
					)}
				</div>
			</div>
		</>
	);
};

export default VacancyPage;
