"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import classNames from "classnames";
import "./LngSelect.scss";

const lngData = [
	{ code: "uk", name: "Українська", flagIcon: "/lng-icons/uk.svg" },
	{ code: "cs", name: "Čeština", flagIcon: "/lng-icons/cs.svg" },
	{ code: "sk", name: "Slovak", flagIcon: "/lng-icons/sk.svg" },
	{ code: "en", name: "English", flagIcon: "/lng-icons/en.svg" },
];

const LngSelect = () => {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const t = useTranslations();

	const [lngSelectVisible, setLngSelectVisible] = useState(false);

	const currentLng = lngData.find((lng) => lng.code === locale) || lngData[0];

	// TODO: LEARN THIS
	const handleLngOption = (lngCode: string) => {
		const newPathname = pathname.replace(`/${locale}`, `/${lngCode}`);
		router.replace(newPathname);
		setLngSelectVisible(false);
	};

	return (
		<>
			{/* lng-select__banner */}
			<div
				className={classNames("lng-select-banner", {
					"lng-select-banner--visible": lngSelectVisible,
				})}
				id="lng-select-banner"
				aria-hidden={!lngSelectVisible}
			>
				<div className="lng-select-banner__header">
					<p className="lng-select-banner__title">{t("choose_lng_title")}</p>
					<button onClick={() => setLngSelectVisible(false)}>
						{t("close")}
					</button>
				</div>
				<div className="lng-select-list-container">
					<ul className="lng-select__list">
						{lngData.map((lng) => {
							return (
								<li
									onClick={() => handleLngOption(lng.code)}
									key={lng.code}
									className={classNames("lng-select__option", {
										"lng-select__option--active": locale === lng.code,
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
				onClick={() => setLngSelectVisible(false)}
				className={classNames("lng-select__curtain", {
					"lng-select__curtain--active": lngSelectVisible,
				})}
			></div>
			{/* lng-select */}
			<div className="lng-select">
				<button
					onClick={() => setLngSelectVisible(true)}
					className="lng-select__btn"
					aria-expanded={lngSelectVisible}
					aria-controls="lng-select-banner"
				>
					<span className="lng-select__btn-value">{currentLng.name}</span>
					<img width={25} height={25} src={currentLng.flagIcon} alt="" />
				</button>
			</div>
		</>
	);
};

export default LngSelect;
