import { useTranslation } from "react-i18next";
import handleCopy from "../../utils/handleCopy";
import instagramIcon from "/icons/instagram.png";
import tiktokIcon from "/icons/tik-tok.png";
import facebookIcon from "/icons/facebook.png";
import "./ContactUs.scss";

const ContactUs = () => {
	const { t } = useTranslation();

	function removeContactUs() {
		document
			.querySelector(".contact-us")
			.classList.remove("contact-us--active");
		document
			.querySelector(".contact-us__curtain")
			.classList.remove("contact-us__curtain--active");
	}

	const instagramUrl = "https://www.instagram.com/flovas.agency/";
	const tiktokUrl = "https://www.tiktok.com/@flovas.agency";
	const facebookUrl = "https://www.facebook.com/profile.php?id=61565186673220";

	return (
		<>
			<div className={"contact-us"}>
				<div className={"contact-us__header"}>
					<p className={"contact-us__title"}>{t("contact_us_title")}</p>
					<button onClick={removeContactUs}>{t("close")}</button>
				</div>
				<div className="contact-us__inner">
					<div className="contact-us__info">
						<p className="contact-us__info-title">{t("contact_info")}</p>
						<div>
							<p>{t("tel")}</p>
							<a href="tel:+420777957290">+420 777 957 290</a>
							<p>E-mail</p>
							<a href="mailto:work1agency@seznam.cz">work1agency@seznam.cz</a>
							<p>{t("address")}</p>
							<a href="https://maps.app.goo.gl/g5t8zBqjSifGmSWR9">
								Pod Hroby 271 Kolín IV
							</a>
							<div>
								<p>IČO</p>
								<button
									onClick={(e) =>
										handleCopy(e, ".contact-us__info-btn", t("copied"))
									}
									title={t("click_to_copy")}
									className="contact-us__info-btn"
								>
									17430089
								</button>
							</div>
						</div>
					</div>
					<div className="contact-us__socials">
						<p className="contact-us__socials-title">{t("follow_us")}</p>
						<div>
							<a href={instagramUrl} title="Instagram" target="_blank">
								<img
									width={40}
									height={40}
									src={instagramIcon}
									alt="Instagram"
								/>
							</a>
							<a href={tiktokUrl} title="TikTok" target="_blank">
								<img width={40} height={40} src={tiktokIcon} alt="TikTok" />
							</a>
							<a href={facebookUrl} title="Facebook" target="_blank">
								<img width={40} height={40} src={facebookIcon} alt="Facebook" />
							</a>
						</div>
					</div>
					<div>
						<p className="contact-us__map-title">{t("map_title")}</p>
						<iframe
							title="flovas agency location on Google Maps"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2396.4306065654405!2d15.214412699999997!3d50.0242313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470c153bf1fd2a9d%3A0xd6870708de146d86!2sPod%20Hroby%20271%2C%20280%2002%20Kol%C3%ADn%20IV!5e1!3m2!1sen!2scz!4v1747227621758!5m2!1sen!2scz"
							width={"100%"}
							loading="lazy"
						></iframe>
					</div>
				</div>
			</div>
			<div className="contact-us__curtain"></div>
		</>
	);
};

export default ContactUs;
