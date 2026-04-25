"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import classNames from "classnames";
import "./styles.scss";

const faqs = [
	{
		q: "faq.q.1",
		a: "faq.a.1",
	},
	{
		q: "faq.q.2",
		a: "faq.a.2",
	},
	{
		q: "faq.q.3",
		a: "faq.a.3",
	},
	{
		q: "faq.q.4",
		a: "faq.a.4",
	},
	{
		q: "faq.q.5",
		a: "faq.a.5",
	},
	{
		q: "faq.q.6",
		a: "faq.a.6",
	},
	{
		q: "faq.q.7",
		a: "faq.a.7",
	},
	{
		q: "faq.q.8",
		a: "faq.a.8",
	},
	{
		q: "faq.q.9",
		a: "faq.a.9",
	},
];

export default function FAQ() {
	const t = useTranslations();

	const [activeFaq, setActiveFaq] = useState(faqs[0]);

	return (
		<section className="faq">
			<h2 className="faq__title">{t("faq.title")}</h2>
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
		</section>
	);
}
