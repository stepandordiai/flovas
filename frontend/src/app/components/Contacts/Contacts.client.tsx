"use client";

import { useTranslations } from "next-intl";
import handleCopy from "../../utils/handleCopy";

const ContactsClient = () => {
	const t = useTranslations();

	return (
		<button
			onClick={(e) => handleCopy(e, ".contacts__details-btn", t("copied"))}
			title={t("click_to_copy")}
			className="contacts__details-btn"
		>
			17430089
		</button>
	);
};

export default ContactsClient;
