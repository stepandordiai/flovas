import { supabase } from "../../lib/supabase";
import { useState } from "react";
import "./styles.scss";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [authError, setAuthError] = useState("");
	const [authLoading, setAuthLoading] = useState(false);
	const [forgotPassword, setForgotPassword] = useState(false);

	// TODO: LEARN THIS
	const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAuthError("");
		setAuthLoading(true);

		try {
			if (forgotPassword) {
				if (!email) {
					setAuthError("Введіть правильний електронний адрес");
					return;
				}

				const { error } = await supabase.auth.resetPasswordForEmail(email, {
					redirectTo: `${window.location.origin}/reset-password`,
				});

				if (error) throw error;
				alert("Лист для відновлення пароля відправлено");
				setForgotPassword(false);
				return;
			}

			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) throw error;
		} catch (error: any) {
			setAuthError(error.message);
		} finally {
			setAuthLoading(false);
		}
	};

	return (
		<main className="login-main">
			<h1 style={{ fontSize: "2rem" }}>flovas (admin)</h1>
			<p style={{ fontSize: "1.5rem", fontWeight: 700 }}>
				{forgotPassword ? "Забули пароль" : "Вхід"}
			</p>
			{authError && <strong style={{ color: "red" }}>Access denied</strong>}
			<form className="login-form" onSubmit={handleAuth}>
				<div className="login-input-container">
					<label htmlFor="">Логін</label>
					<input
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						type="email"
						placeholder="example@gmail.com"
					/>
				</div>
				{!forgotPassword && (
					<div className="login-input-container">
						<label htmlFor="">Пароль</label>
						<input
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							type="password"
						/>
					</div>
				)}

				<button className="login-submit-btn" type="submit">
					{/* TODO: learn this */}
					{forgotPassword
						? authLoading
							? "Відновлення..."
							: "Відновити пароль"
						: authLoading
							? "Вхід..."
							: "Увійти"}
				</button>
			</form>
			<button
				type="button"
				onClick={() => setForgotPassword((prev) => !prev)}
				style={{
					background: "none",
					border: "none",
					cursor: "pointer",
					textDecoration: "underline",
					textDecorationSkipInk: "none",
				}}
			>
				{forgotPassword ? "Вхід" : "Забули пароль?"}
			</button>
		</main>
	);
};

export default Login;
