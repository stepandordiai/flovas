"use client";

import { useTranslations } from "next-intl";
import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { isValidTel } from "@/app/utils/validators";
import "./TelFormBanner.scss";

type TelFormBannerProps = {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>>;
	id: string;
};

const TelFormBanner = ({ active, setActive, id }: TelFormBannerProps) => {
	const t = useTranslations();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [tel, setTel] = useState("");
	const [inputTouched, setInputTouched] = useState(false);

	const saveData = async (e: any) => {
		e.preventDefault();

		if (!isValidTel(tel)) {
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const res = await axios.post(
				`https://weekly-planner-backend.onrender.com/leads`,
				{ tel: tel },
			);
			console.log(res);

			setSuccess(true);
		} catch (err: any) {
			setError(err.response?.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div
				className={classNames("tel-form-banner", {
					"tel-form-banner--active": active,
				})}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 10,
					}}
				>
					<p className="tel-form-banner__title">{t("tel_form_banner.title")}</p>
					<button
						onClick={() => {
							setActive(false);
							setTimeout(() => {
								setSuccess(false);
								setError(null);
								setInputTouched(false);
								setTel("");
							}, 500);
						}}
					>
						{t("close")}
					</button>
				</div>
				<div
					style={{ position: "relative", overflow: "hidden", borderRadius: 20 }}
				>
					{(success || loading || error !== null) && (
						<div
							className={`tel-form-banner__success-container ${loading ? "loading" : error !== null ? "error" : success ? "success" : ""}`.trim()}
						>
							{loading && <p>{t("loading")}</p>}
							{success && <p>{t("success")}</p>}
							{error !== null && <p>{error}</p>}
						</div>
					)}
					<form className="tel-form-banner__form" onSubmit={saveData}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								textAlign: "center",
								rowGap: 10,
							}}
						>
							<label htmlFor={id}>{t("tel")}</label>
							<input
								className={`input ${inputTouched && !isValidTel(tel) ? "input--invalid" : ""}`.trim()}
								onChange={(e) => {
									setTel(e.target.value);
								}}
								onBlur={() => setInputTouched(true)}
								value={tel}
								type="tel"
								name="tel"
								// TODO: ?
								autoComplete="tel"
								id={id}
								required
							/>
						</div>
						{inputTouched && !isValidTel(tel) && (
							<p className="input-empty-message">Введіть номер телефону</p>
						)}
						<button className="tel-form-banner__form-btn" type="submit">
							{t("send")}
						</button>
					</form>
				</div>
			</div>
			<div
				onClick={() => {
					setActive(false);
					setTimeout(() => {
						setSuccess(false);
						setError(null);
						setTel("");
						setInputTouched(false);
					}, 500);
				}}
				className={classNames("tel-form-banner__curtain", {
					"tel-form-banner__curtain--active": active,
				})}
			></div>
		</>
	);
};

export default TelFormBanner;
