import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ContactUs from "../../components/ContactUs/ContactUs";
import Vacancies from "../../components/Vacancies/Vacancies";
import About from "../../components/About/About";
import Contacts from "../../components/Contacts/Contacts";
import AddToHomeScreen from "../../components/AddToHomeScreen/AddToHomeScreen";
import "./Home.scss";

const Home = ({ vacanciesData, isLoading, error }) => {
	const { t, i18n } = useTranslation();
	const [text, setText] = useState(t("home.title1"));

	useEffect(() => {
		setText(t("home.title1"));
	}, [i18n.language]);

	const placesData = [
		t("home.place1"),
		t("home.place2"),
		t("home.place3"),
		t("home.place4"),
		t("home.place5"),
		t("home.place6"),
		t("home.place7"),
		t("home.place8"),
	];

	useEffect(() => {
		document.querySelectorAll(".blur-char").forEach((char, index) => {
			setTimeout(() => {
				char.classList.add("blur-char--active");
			}, index * 50);
		});
	}, [text]);

	function rotateWord() {
		const dataShow = document.querySelector(
			".home__rotate-container span[data-show]"
		);
		const dataNext =
			dataShow.nextElementSibling ||
			document.querySelector(".home__rotate-container span:first-child");
		const dataUp = document.querySelector(
			".home__rotate-container span[data-up]"
		);

		if (dataUp) {
			dataUp.removeAttribute("data-up");
		}

		dataShow.removeAttribute("data-show");
		dataShow.setAttribute("data-up", "");
		dataNext.setAttribute("data-show", "");
	}

	useEffect(() => {
		let customInterval;
		setTimeout(() => {
			document
				.querySelector(".home__rotate-container span")
				.setAttribute("data-show", "");
			customInterval = setInterval(rotateWord, 3000);
		}, 1000);

		document
			.querySelector(".home__contact-us-link")
			.addEventListener("click", () => {
				document
					.querySelector(".contact-us")
					.classList.add("contact-us--active");
				document
					.querySelector(".contact-us__curtain")
					.classList.add("contact-us__curtain--active");
			});

		return () => {
			clearInterval(customInterval);
		};
	}, []);

	return (
		<>
			<div className={"home"} id="home">
				<div className={"home-inner"}>
					<div className="home-inner-container">
						<div className={"homie title-container"}>
							<h1 className={"home__title"}>
								<p>
									{text.split("").map((char, index) => {
										return (
											<span key={index} className="blur-char">
												{char}
											</span>
										);
									})}
								</p>
								<div className="home__rotate-container">
									{placesData.map((place, index) => (
										<span key={index}>{place}</span>
									))}
								</div>
								<p>
									{t("home.title2")
										.split("")
										.map((char, index) => {
											return (
												<span key={index} className="blur-char">
													{char}
												</span>
											);
										})}
								</p>
							</h1>
							<div className="home__link-container">
								<button className={"home__link home__contact-us-link"}>
									{t("contact_us_title")}
								</button>
								<a className={"home__link"} href="#vacancies">
									{t("vacancies_title")}{" "}
									<span className="home__link-vacancies-qty">
										{vacanciesData.length}
									</span>
								</a>
							</div>
						</div>
						<Vacancies
							vacanciesData={vacanciesData}
							isLoading={isLoading}
							error={error}
						/>
					</div>
					<About />
					<Contacts />
					<AddToHomeScreen />
				</div>
			</div>
			<ContactUs />
		</>
	);
};

export default Home;
