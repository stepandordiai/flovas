import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import ContactUs from "../../components/ContactUs/ContactUs";
import Vacancies from "../../components/Vacancies/Vacancies";
import About from "../../components/About/About";
import Contacts from "../../components/Contacts/Contacts";
import placesData from "./../../assets/data/places-data.json";
import WebApp from "../../components/WebApp/WebApp";
import { HashLink } from "react-router-hash-link";
import ScrollToTopBtn from "../../components/ScrollToTopBtn/ScrollToTopBtn";
import "./Home.scss";

const Home = ({ vacanciesData, isLoading, error, handleTelFormBanner }) => {
	const { t, i18n } = useTranslation();
	const [text, setText] = useState(t("home.title1"));
	const [contactUsActive, setContactUsActive] = useState(false);

	useEffect(() => {
		setText(t("home.title1"));
	}, [i18n.language]);

	// FIXME:
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

	// FIXME:
	useEffect(() => {
		let customInterval;
		setTimeout(() => {
			document
				.querySelector(".home__rotate-container span")
				.setAttribute("data-show", "");
			customInterval = setInterval(rotateWord, 3000);
		}, 1000);

		return () => {
			clearInterval(customInterval);
		};
	}, []);

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content="Робота в Чехії для українців 2025. flovas s.r.o. – кадрова агенція, яка надає легальне працевлаштування, житло та допомогу з документами по всій Чехії."
				/>
				<title>
					Працевлаштування по всій Чехії &bull; flovas {t("logo_title")}
				</title>
				<link rel="canonical" href="https://www.flovas.cz/" />
			</Helmet>
			<main className="home" id="home">
				<div className="home-inner">
					<div className="home-inner-container">
						<section className="home-top">
							<div className="home__title">
								<p>
									{text.split("").map((char, index) => {
										return (
											<span key={index} className="blur-char">
												{char}
											</span>
										);
									})}
								</p>
								<div className="home__rotate-wrapper">
									<div className="home__rotate-container">
										{placesData.map((place, index) => (
											<span key={index}>{t(place)}</span>
										))}
									</div>
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
							</div>
							<div className="home__link-container">
								<button
									onClick={() => {
										setContactUsActive(true);
									}}
									className="home__link home__contact-us-link"
								>
									{t("contact_us_title")}
								</button>
								<HashLink className="home__link" to="/#vacancies" smooth>
									{t("vacancies_title")}
									<span className="home__link-vacancies-qty">
										{vacanciesData.length}
									</span>
								</HashLink>
							</div>
						</section>
						<Vacancies
							vacanciesData={vacanciesData}
							isLoading={isLoading}
							error={error}
							handleTelFormBanner={handleTelFormBanner}
						/>
					</div>
					<About placesData={placesData} vacanciesData={vacanciesData} />
					<Contacts />
					<WebApp />
					<ScrollToTopBtn />
				</div>
			</main>
			<ContactUs
				contactUsActive={contactUsActive}
				setContactUsActive={setContactUsActive}
			/>
		</>
	);
};

export default Home;
