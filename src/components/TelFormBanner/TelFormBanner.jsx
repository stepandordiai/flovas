import { useTranslation } from "react-i18next";
import classNames from "classnames";
import "./TelFormBanner.scss";

const TelFormBanner = ({ active, setActive }) => {
	const { t } = useTranslation();

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
				onClick={() => setActive(false)}
				className={classNames("tel-form-banner__curtain", {
					"tel-form-banner__curtain--active": active,
				})}
			></div>
		</>
	);
};

export default TelFormBanner;
