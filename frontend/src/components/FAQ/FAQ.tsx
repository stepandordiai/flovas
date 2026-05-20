import { getTranslations } from "next-intl/server";
import FaqClient from "./FaqClient";
import "./styles.scss";
import faqs from "@/data/faqs.json";

export default async function FAQ() {
	const t = await getTranslations();

	const faqsSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map(({ q, a }) => ({
			"@type": "Question",
			name: t(q),
			acceptedAnswer: {
				"@type": "Answer",
				text: t(a),
			},
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqsSchema) }}
			></script>
			<section className="faq">
				<h2 className="faq__title">{t("faq.title")}</h2>
				<FaqClient />
			</section>
		</>
	);
}
