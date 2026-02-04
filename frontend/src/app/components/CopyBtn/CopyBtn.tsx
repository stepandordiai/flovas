"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import classNames from "classnames";
import "./CopyBtn.scss";

const CopyBtn = () => {
	const t = useTranslations();

	const [btnValueCopied, setBtnValueCopied] = useState(false);

	const handleCopy = (value: string) => {
		navigator.clipboard.writeText(value);

		setBtnValueCopied(true);

		setTimeout(() => {
			setBtnValueCopied(false);
		}, 2000);
	};

	return (
		<button
			onClick={() => handleCopy("17430089")}
			title={t("click_to_copy")}
			className={classNames("copy-btn", {
				"copy-btn--copied": btnValueCopied,
			})}
			disabled={btnValueCopied}
		>
			{btnValueCopied ? t("copied") : "17430089"}
		</button>
	);
};

export default CopyBtn;
