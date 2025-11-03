import { useState } from "react";
import contactsData from "./../../assets/data/contacts-data.json";
import messageIcon from "/icons/message.png";
import "./FloatingContact.scss";

const FloatingContact = () => {
	const [isActive, setIsActive] = useState(false);

	const toggleFloatingContact = () => setIsActive((prev) => !prev);

	return (
		<div className="floating-contact">
			<div
				className={`floating-contact-container ${
					isActive ? "floating-contact-container--active" : ""
				}`}
			>
				<div
					className={`floating-contact-container-inner ${
						isActive ? "floating-contact-container-inner--active" : ""
					}`}
				>
					{contactsData.map((contact, index) => {
						return (
							<a
								key={index}
								href={contact.contactUrl}
								target="_blank"
								data-value={contact.title}
							>
								<img
									title={contact.title}
									width={40}
									height={40}
									src={contact.contactImg}
									alt={contact.title}
								/>
							</a>
						);
					})}
				</div>
			</div>
			<button className="floating-contact__btn" onClick={toggleFloatingContact}>
				<img src={messageIcon} width={40} height={40} alt="" />
			</button>
		</div>
	);
};

export default FloatingContact;
