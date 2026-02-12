"use client";

import { useState } from "react";
import contactsData from "@/app/lib/data/contactsData";
import classNames from "classnames";
import TelIcon from "@/app/Icons/TelIcon";
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
						return (
							<a
								key={index}
								className="float-contact__link"
								href={contact.url}
								target="_blank"
								title={contact.title}
							>
								<img src={contact.img} width={30} height={30} alt="" />
							</a>
						);
					})}
				</div>
			</div>
			<button
				className="float-contact__btn"
				onClick={toggleFloatingContact}
				aria-expanded={isActive}
				aria-controls="floating-contact-menu"
			>
				<TelIcon size={25} />
			</button>
		</div>
	);
};

export default FloatingContact;
