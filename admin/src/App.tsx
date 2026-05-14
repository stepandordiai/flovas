import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Leads from "./pages/Leads/Leads";
import Vacancies from "./pages/Vacancies/Vacancies";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import "./scss/App.scss";

interface Lead {
	id: string;
	name: string;
	tel: string;
	address: string;
	position: string;
	message: string;
}

function App() {
	const [leads, setLeads] = useState<Lead[]>([]);

	const getAll = async () =>
		supabase
			.from("leads")
			.select("*")
			.order("updated_at", { ascending: false });

	const load = async () => {
		const { data } = await getAll();
		setLeads(data ?? []);
	};

	useEffect(() => {
		load();
	}, []);

	return (
		<Router>
			<div className="layout">
				<Sidebar />
				<Routes>
					<Route path="/" element={<Home leads={leads} />} />
					<Route path="/vacancies" element={<Vacancies />} />
					<Route
						path="/leads"
						element={<Leads leads={leads} setLeads={setLeads} load={load} />}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
