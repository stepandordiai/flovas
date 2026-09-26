"use client";

import { useTranslations } from "next-intl";
import ShareIcon from "@/components/icons/ShareIcon";

// TODO: learn this
const handleShare = async () => {
	if (navigator.share) {
		await navigator.share({ url: window.location.href });
	} else {
		// desktop fallback — do nothing, hide the button, or show a tooltip
	}
};

const VacancyPageClient = () => {
	const t = useTranslations();

	return (
		<button className="share-btn" onClick={handleShare}>
			<ShareIcon />
			<span>{t("vacancy.shareVacancy")}</span>
		</button>
	);
};

export default VacancyPageClient;
