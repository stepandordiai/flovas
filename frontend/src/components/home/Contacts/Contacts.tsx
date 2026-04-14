import { getTranslations } from "next-intl/server";
import socialsData from "@/data/socialsData";
import CopyBtn from "../../CopyBtn/CopyBtn";
import ContactsClient from "./ContactsClient";
import "./Contacts.scss";

export default async function Contacts() {
	const t = await getTranslations();

	return (
		<section className="contacts" id="kontakty">
			<h2 className="contacts__title">{t("contacts_title")}</h2>
			<div className="contacts__inner">
				<div className="contacts-container">
					<h3 className="contacts__details-title">{t("contact_info")}</h3>
					<div className="contacts__details-container">
						<p>{t("tel")}</p>
						<a href="tel:+420777957290">+420 777 957 290</a>
						<p>Email</p>
						<a href="mailto:info@neresen.cz">info@neresen.cz</a>
						<p>{t("address")}</p>
						<a href="https://maps.app.goo.gl/BfeYpMKrLn5XpkmCA">
							Pod Hroby 271 Kolín IV
						</a>
						<p>IČO</p>
						<span>
							17430089 <CopyBtn txt="17430089" />
						</span>
					</div>
					<h3>
						Підписуйтесь на наші соціальні мережі, щоб не пропустити нові
						вакансії в Чехії.
					</h3>
					<div className="contacts__socials-container">
						{socialsData.map((social, i) => {
							const Icon = social.icon;
							return (
								<a
									className="contacts__socials-link"
									key={i}
									href={social.url}
									target="_blank"
								>
									<Icon />
									<span>{social.title}</span>
								</a>
							);
						})}
					</div>
					<h3>{t("map_title")}</h3>
					<iframe
						className="map"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d329.5935177795711!2d15.214144089939822!3d50.02410476646222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470c1551f5cf6ff7%3A0xf2d6322ddcdffd0!2sflovas%20s.r.o.!5e1!3m2!1sen!2scz!4v1752502315664!5m2!1sen!2scz"
						title="flovas agency location on Google Maps"
						loading="lazy"
					></iframe>
				</div>
				<div className="contacts-container">
					<h3 className="contacts__details-title">{t("contacts.contactUs")}</h3>
					<p>Заповніть форму, і ми зв’яжемося з вами найближчим часом.</p>
					<ContactsClient />
				</div>
			</div>
		</section>
	);
}
