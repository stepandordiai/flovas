import phoneIcon from "/icons/phone.png";
import whatsappIcon from "/icons/whatsapp.png";
import telegramIcon from "/icons/telegram.png";
import "./FloatingContact.scss";

const FloatingContact = () => {
	return (
		<div className="floating-contact">
			<a href="https://t.me/Robota_1cz" target="_blank">
				<img
					title="Telegram"
					width={50}
					height={50}
					src={telegramIcon}
					alt="Telegram"
				/>
			</a>
			<a href="https://wa.me/420777957290" target="_blank">
				<img
					title="WhatsApp"
					width={50}
					height={50}
					src={whatsappIcon}
					alt="WhatsApp"
				/>
			</a>
			<a href="tel:+420777957290">
				<img title="Phone" width={50} height={50} src={phoneIcon} alt="Phone" />
			</a>
		</div>
	);
};

export default FloatingContact;
