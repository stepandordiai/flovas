"use client";
import { useState } from "react";
import classNames from "classnames";
import faqs from "@/data/faqs.json";

export default function FaqClient() {
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
							{faq.q}
						</button>
						<div
							className={classNames("faq-dd", {
								"faq-dd--active": faq === activeFaq,
							})}
						>
							<p>{faq.a}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}
