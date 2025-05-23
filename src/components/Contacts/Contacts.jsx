import { useTranslation } from "react-i18next";
import instagramIcon from "/icons/instagram.png";
import tiktokIcon from "/icons/tik-tok.png";
import facebookIcon from "/icons/facebook.png";
import "./Contacts.scss";

const Contacts = () => {
	const { t } = useTranslation();

	const instagramUrl = "https://www.instagram.com/flovas.agency/";
	const tiktokUrl = "https://www.tiktok.com/@flovas.agency";
	const facebookUrl = "https://www.facebook.com/profile.php?id=61565186673220";

	return (
		<div className="contacts" id="contacts">
			<h2 className="contacts__title">{t("contacts_title")}</h2>
			<div className="contacts__inner">
				<div className="contacts__details">
					<h3 className="contacts__details-title">{t("contact_info")}</h3>
					<div className="contacts__details-container">
						<p>{t("tel")}</p>
						<a href="tel:+420777957290">+420777957290</a>
						<p>E-mail</p>
						<a href="mailto:work1agency@seznam.cz">work1agency@seznam.cz</a>
						<p>{t("address")}</p>
						<a href="https://maps.app.goo.gl/BfeYpMKrLn5XpkmCA">
							Pod Hroby 271 Kolín IV
						</a>
					</div>
					<h3 className="contacts__details-title">{t("contacts.socials")}</h3>
					<div className="contacts__socials-container">
						<a href={instagramUrl} target="_blank" title="Instagram">
							<img width={40} height={40} src={instagramIcon} alt="Instagram" />
						</a>
						<a href={tiktokUrl} target="_blank" title="TikTok">
							<img width={40} height={40} src={tiktokIcon} alt="TikTok" />
						</a>
						<a href={facebookUrl} target="_blank" title="Facebook">
							<img width={40} height={40} src={facebookIcon} alt="Facebook" />
						</a>
					</div>
				</div>
				<div className="contacts__map">
					<h3 className="contacts__map-title">{t("map_title")}</h3>
					<iframe
						className="map"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2396.4306065654405!2d15.214412699999997!3d50.0242313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470c153bf1fd2a9d%3A0xd6870708de146d86!2sPod%20Hroby%20271%2C%20280%2002%20Kol%C3%ADn%20IV!5e1!3m2!1sen!2scz!4v1747227621758!5m2!1sen!2scz"
						loading="lazy"
					></iframe>
				</div>
			</div>
		</div>
	);
};

export default Contacts;
