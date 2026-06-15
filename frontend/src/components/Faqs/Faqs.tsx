import { getTranslations } from "next-intl/server";
import FaqsClient from "./FaqsClient";
import faqs from "@/data/faqs.json";
import "./styles.scss";

export default async function Faqs() {
	const t = await getTranslations();

	const faqsSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map(({ q, a }) => ({
			"@type": "Question",
			name: q,
			acceptedAnswer: {
				"@type": "Answer",
				text: a,
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
				<FaqsClient />
			</section>
		</>
	);
}
