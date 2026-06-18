import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

const ResetPassword = () => {
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleReset = async () => {
		setLoading(true);
		setError("");

		try {
			const { error } = await supabase.auth.updateUser({
				password,
			});

			if (error) throw error;
			alert("Пароль успішно змінено!");
			await supabase.auth.signOut();
			navigate("/login", { replace: true });
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "Помилка відновлення пароля",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="reset-password">
			<div className="reset-password-container">
				<h1 style={{ textAlign: "center", fontSize: "1.5rem" }}>
					Відновлення пароля
				</h1>
				{error && <p>{error}</p>}
				<div className="reset-password-input-container">
					<label htmlFor="">Новий пароль</label>
					<input
						className=""
						type="password"
						placeholder="Новий пароль"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button className="primary-btn" onClick={handleReset}>
					{loading ? "Зачекайте..." : "Змінити пароль"}
				</button>
			</div>
		</main>
	);
};

export default ResetPassword;
