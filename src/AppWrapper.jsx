import { useEffect, useState } from "react";
import Loading from "./components/Loading/Loading";

export default function AppWrapper({ children }) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			// Load global config, auth, etc.
			await new Promise((resolve) => setTimeout(resolve, 2000));
			setLoading(false);
		};

		load();
	}, []);

	if (loading) return <Loading />;

	return <>{children}</>;
}
