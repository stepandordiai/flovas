import { useTranslation } from "react-i18next";
import "./TelFormBanner.scss";

const TelFormBanner = ({ active, setActive }) => {
	const { t } = useTranslation();

	const closeTelFormBanner = () => {
		setActive(false);
	};

	return (
		<>
			<div
				className={`tel-form-banner ${active ? "tel-form-banner--active" : ""}`}
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
					<button onClick={closeTelFormBanner}>{t("close")}</button>
				</div>
				<form
					className="tel-form-banner__form"
					action="mailto:info@neresen.cz"
					method="post"
					encType="text/plain"
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
				onClick={closeTelFormBanner}
				className={`tel-form-banner__curtain ${
					active ? "tel-form-banner__curtain--active" : ""
				}`}
			></div>
		</>
	);
};

export default TelFormBanner;
