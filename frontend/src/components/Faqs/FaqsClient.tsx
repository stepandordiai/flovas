"use client";

import { useState } from "react";
import classNames from "classnames";
import faqs from "@/data/faqs.json";

export default function FaqsClient() {
	const [activeFaqIndex, setActiveFaqIndex] = useState(0);

	return (
		<div className="faq-container">
			{faqs.map((faq, i) => {
				return (
					<div
						key={i}
						className={classNames("faq-item", {
							"faq-item--active": i === activeFaqIndex,
						})}
					>
						<button className="faq__btn" onClick={() => setActiveFaqIndex(i)}>
							{faq.q}
						</button>
						<div
							className={classNames("faq-dd", {
								"faq-dd--active": i === activeFaqIndex,
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
