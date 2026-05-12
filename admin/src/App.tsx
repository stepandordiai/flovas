import "./scss/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Leads from "./pages/Leads/Leads";
import Vacancies from "./pages/Vacancies/Vacancies";

function App() {
	return (
		<Router>
			<div className="layout">
				<Sidebar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/vacancies" element={<Vacancies />} />
					<Route path="/leads" element={<Leads />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
