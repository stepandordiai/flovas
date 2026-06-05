import { supabase } from "../../lib/supabase";
import { useState } from "react";
import "./styles.scss";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [authError, setAuthError] = useState("");
	const [authLoading, setAuthLoading] = useState(false);

	// TODO: LEARN THIS
	const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAuthLoading(true);
		setAuthError("");

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) setAuthError(error.message);
		setAuthLoading(false);
	};

	return (
		<main className="login-main">
			<h1 style={{ fontSize: "2rem" }}>flovas (admin)</h1>
			<p>Please enter credentials to get access</p>
			{authError && <strong style={{ color: "red" }}>Access denied</strong>}
			<form className="login-form" onSubmit={handleAuth}>
				<div className="login-input-container">
					<label htmlFor="">Логін</label>
					<input
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						type="email"
					/>
				</div>
				<div className="login-input-container">
					<label htmlFor="">Пароль</label>
					<input
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						type="password"
					/>
				</div>
				<button className="login-submit-btn" type="submit">
					{authLoading ? "Зачекайте..." : "Увійти"}
				</button>
			</form>
		</main>
	);
};

export default Login;
