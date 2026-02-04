"use client";

import { useTranslations } from "next-intl";
import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import "./TelFormBanner.scss";
import axios from "axios";

type TelFormBannerProps = {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>>;
};

const TelFormBanner = ({ active, setActive }: TelFormBannerProps) => {
	const t = useTranslations();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [tel, setTel] = useState("");

	const saveData = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const res = await axios.post(
				`https://weekly-planner-backend.onrender.com/leads`,
				tel,
			);
			console.log(res);
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
					<button onClick={() => setActive(false)}>{t("close")}</button>
				</div>
				<form
					className="tel-form-banner__form"
					// action="mailto:info@neresen.cz"

					// method="post"
					// encType="text/plain"
					onSubmit={saveData}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							textAlign: "center",
							rowGap: 10,
						}}
					>
						<label htmlFor="tel">{t("tel")}</label>
						<input
							style={{
								textAlign: "center",
								border: "1px solid var(--bg-clr)",
								height: 30,
								borderRadius: 15,
							}}
							onChange={(e) => setTel(e.target.value)}
							value={tel}
							type="tel"
							name="tel"
							id="tel"
							placeholder="+__(___)___-____"
						/>
					</div>
					<button className="tel-form-banner__form-btn" type="submit">
						{t("send")}
					</button>
				</form>
			</div>
			<div
				onClick={() => setActive(false)}
				className={classNames("tel-form-banner__curtain", {
					"tel-form-banner__curtain--active": active,
				})}
			></div>
		</>
	);
};

export default TelFormBanner;
