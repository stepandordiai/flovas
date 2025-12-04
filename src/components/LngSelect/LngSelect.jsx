import { useTranslation } from "react-i18next";
import { useState } from "react";
import i18n from "i18next";
import classNames from "classnames";
import ukIcon from "/lng-icons/uk.svg";
import csIcon from "/lng-icons/cs.svg";
import skIcon from "/lng-icons/sk.svg";
import enIcon from "/lng-icons/en.svg";
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
			{/* lng-select__banner */}
			<div
				className={classNames("lng-select-banner", {
					"lng-select__list--visible": lngSelectActive,
				})}
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
									className={classNames("lng-select__option", {
										"lng-select__option--active": selectedLng.code === lng.code,
									})}
								>
									<span>{lng.name}</span>
									<img width={24} height={24} src={lng.flagIcon} alt="" />
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			{/* lng-select__curtain */}
			<div
				onClick={() => setLngSelectActive(false)}
				className={classNames("lng-select__curtain", {
					"lng-select__curtain--active": lngSelectActive,
				})}
			></div>
			{/* lng-select */}
			<div className="lng-select">
				<button
					onClick={() => setLngSelectActive(true)}
					className="lng-select__btn"
				>
					<span className="lng-select__btn-value">{selectedLng.name}</span>
					<img width={25} height={25} src={selectedLng.flagIcon} alt="" />
				</button>
			</div>
		</>
	);
};

export default LanguageSelect;
