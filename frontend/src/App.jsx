import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import VacancyPage from "./pages/VacancyPage/VacancyPage";
import "./i18next";
import axios from "axios";
import { useEffect, useState } from "react";
import ScrollToTop from "./utils/ScrollToTop";
import FloatingContact from "./components/FloatingContact/FloatingContact";
// import AppWrapper from "./AppWrapper";
import TelFormBanner from "./components/TelFormBanner/TelFormBanner";
import NotFound from "./pages/NotFound/NotFound";
import "./scss/App.scss";

function App() {
	const [vacanciesData, setVacanciesData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// TelFormBanner
	const [active, setActive] = useState(false);
	const handleTelFormBanner = () => setActive(true);

	useEffect(() => {
		const getVacanciesData = async () => {
			setIsLoading(true);
			try {
				const response = await axios(import.meta.env.VITE_API_URL);
				setVacanciesData(response.data);
			} catch (error) {
				setError(error);
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getVacanciesData();
	}, []);

	return (
		<Router>
			{/* <AppWrapper> */}
			<ScrollToTop />
			<Header vacanciesData={vacanciesData} />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							vacanciesData={vacanciesData}
							isLoading={isLoading}
							error={error}
							handleTelFormBanner={handleTelFormBanner}
						/>
					}
				/>
				<Route
					path="/vacancy-page/:id"
					element={<VacancyPage vacanciesData={vacanciesData} />}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
			<div className="empty-div"></div>
			<Footer />
			<FloatingContact />
			<TelFormBanner active={active} setActive={setActive} />
			{/* </AppWrapper> */}
		</Router>
	);
}

export default App;
