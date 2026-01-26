import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import Home from "./pages/Home/Home";
import EditPage from "./pages/EditPage/EditPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.scss";

function App() {
	return (
		<Router>
			<ScrollToTop />
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/create-page" element={<CreatePage />} />
				<Route path="/edit-page/:id" element={<EditPage />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
