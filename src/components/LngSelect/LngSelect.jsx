import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18n from "i18next";
import ukIcon from "/lng-icons/ukraine.png";
import csIcon from "/lng-icons/czech-republic.png";
import skIcon from "/lng-icons/slovakia.png";
import enIcon from "/lng-icons/united-states.png";
import "./LngSelect.scss";

const LanguageSelect = () => {
	const { t } = useTranslation();

	let lngSelectBtnTxt = "Українська";
	let lngSelectBtnIcon = ukIcon;
	useEffect(() => {
		const handleChangeLanguage = (lng) => {
			i18n.changeLanguage(lng);
		};

		const selectBtn = document.querySelector(".lng-select__btn");
		const selectList = document.querySelector(".lng-select-banner");
		const selectOptions = selectList.querySelectorAll(".lng-select__option");

		selectBtn.addEventListener("click", () => {
			selectList.classList.add("lng-select__list--visible");
			document
				.querySelector(".lng-select__curtain")
				.classList.add("lng-select__curtain--active");
		});

		selectOptions.forEach((option) => {
			option.addEventListener("click", (e) => {
				e.stopPropagation();
				handleChangeLanguage(option.dataset.value);

				for (let i = 0; i < selectOptions.length; i++) {
					selectOptions[i].classList.remove("lng-select__option--active");
				}

				option.classList.add("lng-select__option--active");

				// FIXME:
				selectBtn.querySelector("span").innerHTML =
					option.querySelector("span").innerHTML;
				selectBtn.querySelector("img").src = option.querySelector("img").src;
				selectList.classList.remove("lng-select__list--visible");
				document
					.querySelector(".lng-select__curtain")
					.classList.remove("lng-select__curtain--active");
			});
		});

		document.addEventListener("click", (e) => {
			if (e.target !== selectBtn) {
				selectList.classList.remove("lng-select__list--visible");
				document
					.querySelector(".lng-select__curtain")
					.classList.remove("lng-select__curtain--active");
			}
		});
	}, []);

	function getLngStorage() {
		return localStorage.getItem("i18nextLng") || "uk";
	}

	switch (getLngStorage()) {
		case "uk":
			lngSelectBtnTxt = "Українська";
			lngSelectBtnIcon = ukIcon;
			break;
		case "cs":
			lngSelectBtnTxt = "Čeština";
			lngSelectBtnIcon = csIcon;
			break;
		case "sk":
			lngSelectBtnTxt = "Slovak";
			lngSelectBtnIcon = skIcon;
			break;
		case "en":
			lngSelectBtnTxt = "English";
			lngSelectBtnIcon = enIcon;
			break;
	}

	const inactiveLngOption = "lng-select__option";
	const activeLngOption = "lng-select__option lng-select__option--active";

	return (
		<>
			<div className="lng-select">
				<button className="lng-select__btn">
					<span className="lng-select__btn-value">{lngSelectBtnTxt}</span>
					<img width={25} height={25} src={lngSelectBtnIcon} alt="" />
				</button>
			</div>
			<div className="lng-select-banner">
				<div className="lng-select-banner__header">
					<p className="lng-select-banner__title">{t("choose_lng_title")}</p>
					<button>{t("close")}</button>
				</div>
				<div className="lng-select-list-container">
					<ul className="lng-select__list">
						<li
							className={
								getLngStorage() === "uk" ? activeLngOption : inactiveLngOption
							}
							data-value="uk"
						>
							<span>Українська</span>
							<img width={25} height={25} src={ukIcon} alt="" />
						</li>
						<li
							className={
								getLngStorage() === "cs" ? activeLngOption : inactiveLngOption
							}
							data-value="cs"
						>
							<span>Čeština</span>
							<img width={25} height={25} src={csIcon} alt="" />
						</li>
						<li
							className={
								getLngStorage() === "sk" ? activeLngOption : inactiveLngOption
							}
							data-value="sk"
						>
							<span>Slovak</span>
							<img width={25} height={25} src={skIcon} alt="" />
						</li>
						<li
							className={
								getLngStorage() === "en" ? activeLngOption : inactiveLngOption
							}
							data-value="en"
						>
							<span>English</span>
							<img width={25} height={25} src={enIcon} alt="" />
						</li>
					</ul>
				</div>
			</div>
			<div className="lng-select__curtain"></div>
		</>
	);
};

export default LanguageSelect;
