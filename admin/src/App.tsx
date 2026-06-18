import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Leads from "./pages/Leads/Leads";
import Vacancies from "./pages/Vacancies/Vacancies";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import type { Session } from "@supabase/supabase-js";
import type { Vacancy } from "./interfaces/Vacancy";
import type { Lead } from "./interfaces/Lead";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import "./scss/App.scss";

function App() {
	const [leads, setLeads] = useState<Lead[]>([]);
	const [vacancies, setVacancies] = useState<Vacancy[]>([]);
	const [session, setSession] = useState<Session | null>(null);
	const [authLoading, setAuthLoading] = useState(true);

	// TODO: LEARN THIS
	useEffect(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setAuthLoading(false);
		});

		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session);
			},
		);

		return () => listener.subscription.unsubscribe();
	}, []);

	const loadLeads = async () => {
		const { data } = await supabase
			.from("leads")
			.select("*")
			.order("updated_at", { ascending: false });
		setLeads(data ?? []);
	};

	const loadVacancies = async () => {
		const { data } = await supabase
			.from("vacancies")
			.select("*")
			.order("updated_at", { ascending: false });
		setVacancies(data ?? []);
	};

	useEffect(() => {
		if (session) {
			loadLeads();
			loadVacancies();
		}
	}, [session]);

	// TODO: learn this
	if (authLoading) return null;
	if (!session) return <Login />;

	return (
		<Router>
			<Routes>
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route
					path="/*"
					element={
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
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
