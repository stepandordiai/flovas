import { useTranslation } from "react-i18next";
import { useState } from "react";
import i18n from "i18next";
import ukIcon from "/lng-icons/ukraine.png";
import csIcon from "/lng-icons/czech-republic.png";
import skIcon from "/lng-icons/slovakia.png";
import enIcon from "/lng-icons/united-states.png";
import "./LngSelect.scss";

const lngData = [
	{ code: "uk", name: "Українська", flagIcon: ukIcon },
	{ code: "cs", name: "Čeština", flagIcon: csIcon },
	{ code: "sk", name: "Slovak", flagIcon: skIcon },
	{ code: "en", name: "English", flagIcon: enIcon },
];

const getLngStorage = () => localStorage.getItem("i18nextLng") || "uk";

const LanguageSelect = () => {
	const { t } = useTranslation();

	const [lngSelectActive, setLngSelectActive] = useState(false);
	// TODO:
	const [selectedLng, setSelectedLng] = useState(
		lngData.find((lng) => lng.code === getLngStorage())
	);

	const handleLngOption = (lng) => {
		i18n.changeLanguage(lng.code);
		setSelectedLng(lng);
		setLngSelectActive(false);
	};

	return (
		<>
			<div className="lng-select">
				<button
					onClick={() => setLngSelectActive(true)}
					className="lng-select__btn"
				>
					<span className="lng-select__btn-value">{selectedLng.name}</span>
					<img width={25} height={25} src={selectedLng.flagIcon} alt="" />
				</button>
			</div>
			<div
				className={`lng-select-banner ${
					lngSelectActive ? "lng-select__list--visible" : ""
				}`}
			>
				<div className="lng-select-banner__header">
					<p className="lng-select-banner__title">{t("choose_lng_title")}</p>
					<button onClick={() => setLngSelectActive(false)}>
						{t("close")}
					</button>
				</div>
				<div className="lng-select-list-container">
					<ul className="lng-select__list">
						{lngData.map((lng) => {
							return (
								<li
									onClick={() => handleLngOption(lng)}
									key={lng.code}
									className={`lng-select__option ${
										selectedLng.code === lng.code
											? "lng-select__option--active"
											: ""
									}`}
								>
									<span>{lng.name}</span>
									<img width={25} height={25} src={lng.flagIcon} alt="" />
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div
				onClick={() => setLngSelectActive(false)}
				className={`lng-select__curtain ${
					lngSelectActive ? "lng-select__curtain--active" : ""
				}`}
			></div>
		</>
	);
};

export default LanguageSelect;
