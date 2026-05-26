import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Leads from "./pages/Leads/Leads";
import Vacancies from "./pages/Vacancies/Vacancies";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import type { Vacancy } from "./interfaces/Vacancy";
import "./scss/App.scss";

interface Lead {
	id: string;
	name: string;
	tel: string;
	address: string;
	position: string;
	message: string;
	is_working: boolean;
	created_at: Date;
}

function App() {
	const [leads, setLeads] = useState<Lead[]>([]);
	const [vacancies, setVacancies] = useState<Vacancy[]>([]);

	const getAllLeads = async () =>
		supabase
			.from("leads")
			.select("*")
			.order("updated_at", { ascending: false });

	const loadLeads = async () => {
		const { data } = await getAllLeads();
		setLeads(data ?? []);
	};

	const getAllVacancies = async () =>
		supabase
			.from("vacancies")
			.select("*")
			.order("updated_at", { ascending: false });

	const loadVacancies = async () => {
		const { data } = await getAllVacancies();
		setVacancies(data ?? []);
	};

	useEffect(() => {
		loadLeads();
	}, []);

	useEffect(() => {
		loadVacancies();
	}, []);

	return (
		<Router>
			<div className="layout">
				<Sidebar />
				<Routes>
					<Route
						path="/"
						element={<Home leads={leads} vacancies={vacancies} />}
					/>
					<Route
						path="/vacancies"
						element={
							<Vacancies
								vacancies={vacancies}
								setVacancies={setVacancies}
								load={loadVacancies}
							/>
						}
					/>
					<Route
						path="/leads"
						element={
							<Leads leads={leads} setLeads={setLeads} load={loadLeads} />
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
