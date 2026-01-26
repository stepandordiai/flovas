import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import placesData from "./../../data/places-data.json";
import imagesData from "./../../data/images-data.json";
import "./CreatePage.scss";

const CreatePage = () => {
	const [inputs, setInputs] = useState({
		img: "",
		place: "",
		title: "",
		desc: "",
		isActive: true,
	});
	const [createPreload, setCreatePreload] = useState(false);

	const banner = useRef(null);

	const navigate = useNavigate();

	const saveVacancyData = async (e) => {
		e.preventDefault();
		setCreatePreload(true);

		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			await axios.post(import.meta.env.VITE_API_URL, inputs);
		} catch (error) {
			console.log(error);
		} finally {
			setCreatePreload(false);

			if (banner.current) {
				banner.current.classList.add("create-page__banner--active");

				setTimeout(() => {
					banner.current.classList.remove("create-page__banner--active");
					navigate("/");
				}, 3000);
			}
		}
	};

	// React select
	const [selectedOptions, setSelectedOptions] = useState([]);

	const handleSelectChange = (selected) => {
		setSelectedOptions(selected || {});
	};

	const getSelectedValues = () => {
		return selectedOptions.map((option) => option.value).join(", ");
	};

	useEffect(() => {
		setInputs({ ...inputs, place: getSelectedValues() });
	}, [selectedOptions]);

	return (
		<>
			<div ref={banner} className="create-page__banner">
				Вакансія створена!
			</div>
			<button className="create-page__link" onClick={() => navigate("/")}>
				Назад
			</button>
			<div className="create-page">
				<div className="create-page__inner">
					<p className="create-page__title">Створити вакансію</p>
					{inputs.img ? (
						<img
							// TODO:
							// onError={(e) => {
							// 	//   e.currentTarget.style.display = "none"; // сховати зламане зображення
							// 	//   або можна скинути state
							// 	setInputs({ ...inputs, img: "" });
							// }}
							className="create-page__img"
							src={inputs.img}
							alt=""
						/>
					) : (
						<div className="create-page__no-img"></div>
					)}
					<p>Виберіть картинку для вакансії</p>
					<div className="create-page__thumb-img-container">
						{imagesData.map((img) => {
							return (
								<img
									key={img.id}
									onClick={() =>
										setInputs({
											...inputs,
											// TODO: I need to check in future if img.src starts with /
											img: "https://flovas-admin.netlify.app" + img.imgSrc,
										})
									}
									src={img.imgSrc}
									width={50}
									alt=""
								/>
							);
						})}
					</div>
					<form className="create-page__form" onSubmit={saveVacancyData}>
						<div className="input-container">
							<label>Картинка</label>
							<input
								type="text"
								value={inputs.img}
								onChange={(e) => setInputs({ ...inputs, img: e.target.value })}
								placeholder="Додайте ссилку на картинку"
							/>
						</div>
						<div className="input-container">
							<div>
								<label htmlFor="">Місто</label>
								<Select
									options={placesData}
									isMulti
									onChange={handleSelectChange}
									// onMenuOpen={handleMenuOpen}
									placeholder="Виберіть місто або декілька міст..."
									required
								/>
							</div>
						</div>
						<div className="input-container">
							<label>Заголовок</label>
							<input
								type="text"
								value={inputs.title}
								onChange={(e) =>
									setInputs({ ...inputs, title: e.target.value })
								}
								placeholder={`Наприклад \"Столяр\"`}
								required
							/>
						</div>
						<div className="input-container">
							<label>Опис</label>
							<textarea
								className="text-area"
								value={inputs.desc}
								onChange={(e) => setInputs({ ...inputs, desc: e.target.value })}
								placeholder="Опис вакансії"
								name=""
								id=""
							></textarea>
						</div>
						<div>
							<input
								type="checkbox"
								name=""
								id="vacancy-check"
								onChange={(e) =>
									setInputs({
										...inputs,
										isActive: e.target.checked,
									})
								}
								checked={inputs.isActive}
							/>
							<label style={{ marginLeft: 5 }} htmlFor="vacancy-check">
								Активна вакансія
							</label>
						</div>
						<button
							style={
								createPreload
									? { cursor: "not-allowed" }
									: { cursor: "pointer" }
							}
							className="create-page__form-btn"
							type="submit"
							disabled={createPreload ? true : false}
						>
							{!createPreload ? "Зберегти вакансію" : "Зачекайте будь-ласка..."}
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default CreatePage;
