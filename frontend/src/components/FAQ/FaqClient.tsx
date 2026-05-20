"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import classNames from "classnames";
import faqs from "@/data/faqs.json";

export default function FaqClient() {
	const t = useTranslations();

	const [activeFaq, setActiveFaq] = useState(faqs[0]);

	return (
		<div className="faq-container">
			{faqs.map((faq, i) => {
				return (
					<div
						key={i}
						className={classNames("faq-item", {
							"faq-item--active": faq === activeFaq,
						})}
					>
						<button className="faq__btn" onClick={() => setActiveFaq(faq)}>
							{t(faq.q)}
						</button>
						<div
							className={classNames("faq-dd", {
								"faq-dd--active": faq === activeFaq,
							})}
						>
							<p>{t(activeFaq.a)}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}
