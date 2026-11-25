"use client";

import { useTranslations } from "next-intl";
import ShareIcon from "@/components/icons/ShareIcon";

// TODO: LEARN THIS
const handleShare = async () => {
	try {
		if (navigator.share) {
			await navigator.share({ url: window.location.href });
		} else {
			await navigator.clipboard.writeText(window.location.href);
			// optionally show a "Link copied" toast
		}
	} catch {
		// user closed the share sheet; nothing to do
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
