"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import classNames from "classnames";
import "./CopyBtn.scss";

const CopyBtn = ({ value = "Скопіювати", txt = "" }) => {
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
			onClick={() => handleCopy(txt)}
			title={t("click_to_copy")}
			className={classNames("copy-btn", {
				"copy-btn--copied": btnValueCopied,
			})}
			disabled={btnValueCopied}
		>
			{btnValueCopied ? t("copied") : value}
		</button>
	);
};

export default CopyBtn;
