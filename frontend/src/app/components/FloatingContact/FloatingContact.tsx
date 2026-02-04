"use client";

import { useState } from "react";
import contactsData from "@/app/lib/data/contactsData";
import classNames from "classnames";
import "./FloatingContact.scss";

const FloatingContact = () => {
	const [isActive, setIsActive] = useState(false);

	const toggleFloatingContact = () => setIsActive((prev) => !prev);

	return (
		<div className="floating-contact">
			<div
				className={classNames("floating-contact-container", {
					"floating-contact-container--active": isActive,
				})}
				id="floating-contact-menu"
				aria-hidden={!isActive}
			>
				<div
					className={classNames("floating-contact-container-inner", {
						"floating-contact-container-inner--active": isActive,
					})}
				>
					{contactsData.map((contact, index) => {
						const Icon = contact.contactImg;
						return (
							<a
								key={index}
								href={contact.contactUrl}
								target="_blank"
								data-value={contact.title}
							>
								<Icon size={40} />
							</a>
						);
					})}
				</div>
			</div>
			<button
				className="floating-contact__btn"
				onClick={toggleFloatingContact}
				aria-expanded={isActive}
				aria-controls="floating-contact-menu"
			>
				<img src="/icons/message.svg" width={40} height={40} alt="" />
			</button>
		</div>
	);
};

export default FloatingContact;
