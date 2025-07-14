import { useTranslation } from "react-i18next";
import handleCopy from "../../utils/handleCopy";
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
						<a href="tel:+420777957290">+420 777 957 290</a>
						<p>E-mail</p>
						<a href="mailto:work1agency@seznam.cz">work1agency@seznam.cz</a>
						<p>{t("address")}</p>
						<a href="https://maps.app.goo.gl/BfeYpMKrLn5XpkmCA">
							Pod Hroby 271 Kolín IV
						</a>
						<div>
							<p>IČO</p>
							<button
								onClick={(e) =>
									handleCopy(e, ".contacts__details-btn", t("copied"))
								}
								title={t("click_to_copy")}
								className="contacts__details-btn"
							>
								17430089
							</button>
						</div>
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
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d329.5935177795711!2d15.214144089939822!3d50.02410476646222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470c1551f5cf6ff7%3A0xf2d6322ddcdffd0!2sflovas%20s.r.o.!5e1!3m2!1sen!2scz!4v1752502315664!5m2!1sen!2scz"
						title="flovas agency location on Google Maps"
						loading="lazy"
					></iframe>
				</div>
			</div>
		</div>
	);
};

export default Contacts;
