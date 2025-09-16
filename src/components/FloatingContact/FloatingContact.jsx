import viberIcon from "/icons/viber.png";
import whatsappIcon from "/icons/whatsapp.png";
import telegramIcon from "/icons/telegram.png";
import messageIcon from "/icons/message.png";
import { useState } from "react";
import "./FloatingContact.scss";

const FloatingContact = () => {
	const [isActive, setIsActive] = useState(false);

	const handleFloatingContact = () => {
		setIsActive((prev) => !prev);
	};

	return (
		<div className="floating-contact">
			<div
				className={
					isActive
						? "floating-contact-container floating-contact-container--active"
						: "floating-contact-container"
				}
			>
				<div
					className={
						isActive
							? "floating-contact-container-inner floating-contact-container-inner--active"
							: "floating-contact-container-inner"
					}
				>
					<a
						href="https://t.me/flovas_agency"
						target="_blank"
						data-value="Telegram"
					>
						<img
							title="Telegram"
							width={40}
							height={40}
							src={telegramIcon}
							alt="Telegram"
						/>
					</a>
					<a
						href="https://wa.me/420777957290"
						target="_blank"
						data-value="WhatsApp"
					>
						<img
							title="WhatsApp"
							width={40}
							height={40}
							src={whatsappIcon}
							alt="WhatsApp"
						/>
					</a>
					<a href="viber://chat?number=+420777957290" data-value="Viber">
						<img
							title="Viber"
							width={40}
							height={40}
							src={viberIcon}
							alt="Viber"
						/>
					</a>
				</div>
			</div>
			<button className="floating-contact__btn" onClick={handleFloatingContact}>
				<img src={messageIcon} width={40} height={40} alt="" />
			</button>
		</div>
	);
};

export default FloatingContact;
