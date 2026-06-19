"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import classNames from "classnames";
import "./CopyBtn.scss";

type CopyBtnProps = {
	value: string;
	label?: string;
};

export default function CopyBtn({ value, label = "Скопіювати" }: CopyBtnProps) {
	const t = useTranslations();

	const [btnValueCopied, setBtnValueCopied] = useState(false);

	// navigator.clipboard.writeText() is async
	const handleCopy = async (value: string) => {
		try {
			await navigator.clipboard.writeText(value);
			setBtnValueCopied(true);
			setTimeout(() => setBtnValueCopied(false), 2000);
		} catch (err) {
			console.error("Copy failed:", err);
		}
	};

	return (
		<button
			type="button"
			onClick={() => handleCopy(value)}
			title={t("click_to_copy")}
			className={classNames("copy-btn", {
				"copy-btn--copied": btnValueCopied,
			})}
			disabled={btnValueCopied}
		>
			{btnValueCopied ? t("copied") : label}
		</button>
	);
}
