import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import instagramIcon from "/icons/instagram.png";
import tiktokIcon from "/icons/tiktok.png";
import facebookIcon from "/icons/facebook.png";
import "./Footer.scss";

const Footer = () => {
	const { t } = useTranslation();

	const instagramUrl = "https://www.instagram.com/flovas.agency/";
	const tiktokUrl = "https://www.tiktok.com/@flovas.agency";
	const facebookUrl = "https://www.facebook.com/profile.php?id=61565186673220";

	return (
		<div className="footer">
			<div className="footer-inner">
				<div className="footer-top">
					<p className="footer__logo">Flovas</p>
					<div className="footer__socials">
						<a href={instagramUrl} title="Instagram" target="_blank">
							<img width={30} height={30} src={instagramIcon} alt="Instagram" />
						</a>
						<a href={tiktokUrl} title="TikTok" target="_blank">
							<img width={30} height={30} src={tiktokIcon} alt="TikTok" />
						</a>
						<a href={facebookUrl} title="Facebook" target="_blank">
							<img width={30} height={30} src={facebookIcon} alt="Facebook" />
						</a>
					</div>
				</div>
				<div className="footer__nav-container">
					<div className="footer__nav">
						<p className="footer__nav-title">{t("footer.nav")}</p>
						<div className="footer__nav-list">
							<HashLink to="/#home">{t("home_title")}</HashLink>
							<HashLink to="/#vacancies">{t("vacancies_title")}</HashLink>
							<HashLink to="/#about">{t("about_title")} Flovas</HashLink>
							<HashLink to="/#contacts">{t("contacts_title")}</HashLink>
						</div>
					</div>
					<div className="footer__nav">
						<p className="footer__nav-title">{t("contact_us_title")}</p>
						<div className="footer__nav-list">
							<a href="tel:+420777957290">+420 777 957 290</a>
							<a href="mailto:work1agency@seznam.cz">work1agency@seznam.cz</a>
						</div>
					</div>
					<div className="footer__nav">
						<p className="footer__nav-title">{t("footer.follow_us")}</p>
						<div className="footer__nav-list">
							<a href={instagramUrl} target="_blank">
								Instagram
							</a>
							<a href={tiktokUrl} target="_blank">
								TikTok
							</a>
							<a href={facebookUrl} target="_blank">
								Facebook
							</a>
						</div>
					</div>
				</div>
			</div>
			<div
				className="footer-bottom__slider"
				style={{
					"--width": "200px",
					"--quantity": "6",
				}}
			>
				<div className="footer-bottom__list">
					<div className="footer-bottom__item" style={{ "--position": "1" }}>
						<p>&copy; 2025 Flovas</p>
					</div>
					<div className="footer-bottom__item" style={{ "--position": "2" }}>
						<p>Всі права захищені</p>
					</div>
					<div className="footer-bottom__item" style={{ "--position": "3" }}>
						<p>
							Site by{" "}
							<a href="https://heeeyooo.studio/" target="_blank">
								heeeyooo studio
							</a>
						</p>
					</div>
					<div className="footer-bottom__item" style={{ "--position": "4" }}>
						<p>&copy; 2025 Flovas</p>
					</div>
					<div className="footer-bottom__item" style={{ "--position": "5" }}>
						<p>Всі права захищені</p>
					</div>
					<div className="footer-bottom__item" style={{ "--position": "6" }}>
						<p>
							Site by{" "}
							<a href="https://heeeyooo.studio/" target="_blank">
								heeeyooo studio
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
