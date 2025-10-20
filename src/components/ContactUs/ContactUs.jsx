import { useTranslation } from "react-i18next";
import handleCopy from "../../utils/handleCopy";
import instagramIcon from "/icons/instagram.png";
import tiktokIcon from "/icons/tik-tok.png";
import facebookIcon from "/icons/facebook.png";
import "./ContactUs.scss";

const ContactUs = ({ contactUsActive, setContactUsActive }) => {
	const { t } = useTranslation();

	const instagramUrl = "https://www.instagram.com/flovas.agency/";
	const tiktokUrl = "https://www.tiktok.com/@flovas.agency";
	const facebookUrl = "https://www.facebook.com/profile.php?id=61565186673220";

	return (
		<>
			<div
				className={`contact-us ${contactUsActive ? "contact-us--active" : ""}`}
			>
				<div className="contact-us__header">
					<p className="contact-us__title">{t("contact_us_title")}</p>
					<button
						onClick={() => {
							setContactUsActive(false);
						}}
					>
						{t("close")}
					</button>
				</div>
				<div className="contact-us__inner">
					<div className="contact-us__info">
						<p className="contact-us__info-title">{t("contact_info")}</p>
						<div>
							<p>{t("tel")}</p>
							<a href="tel:+420777957290">+420 777 957 290</a>
							<p>E-mail</p>
							<a href="mailto:info@neresen.cz">info@neresen.cz</a>
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
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d329.5935177795711!2d15.214144089939822!3d50.02410476646222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470c1551f5cf6ff7%3A0xf2d6322ddcdffd0!2sflovas%20s.r.o.!5e1!3m2!1sen!2scz!4v1752502315664!5m2!1sen!2scz"
							width="100%"
							loading="lazy"
							style={{ borderRadius: "15px" }}
						></iframe>
					</div>
				</div>
			</div>
			<div
				onClick={() => {
					setContactUsActive(false);
				}}
				className={`contact-us__curtain ${
					contactUsActive ? "contact-us__curtain--active" : ""
				}`}
			></div>
		</>
	);
};

export default ContactUs;
