"use client";

import { useTranslations } from "next-intl";
import handleCopy from "../../utils/handleCopy";
import socialsData from "@/app/lib/data/socialsData";
import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import "./ContactUs.scss";

type ContactUsTypes = {
	contactUsActive: boolean;
	setContactUsActive: Dispatch<SetStateAction<boolean>>;
};

const ContactUs = ({ contactUsActive, setContactUsActive }: ContactUsTypes) => {
	const t = useTranslations();

	return (
		<>
			<div
				className={classNames("contact-us", {
					"contact-us--active": contactUsActive,
				})}
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
							<p>Email</p>
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
						<p>
							Підписуйтесь на наші соціальні мережі, щоб не пропустити нові
							вакансії в Чехії.
						</p>
						<div>
							{socialsData.map((social) => {
								const Icon = social.socialImg;
								return (
									<a
										key={social.id}
										href={social.socialUrl}
										title={social.title}
										target="_blank"
									>
										<Icon />
									</a>
								);
							})}
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
				className={classNames("contact-us__curtain", {
					"contact-us__curtain--active": contactUsActive,
				})}
			></div>
		</>
	);
};

export default ContactUs;
