import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import ScrollToTopBtn from "@/components/ScrollToTopBtn/ScrollToTopBtn";
import { COMPANY_CODE, EMAIL, TEL } from "@/lib/constants";
import styles from "./Gdpr.module.scss";

const PAGE = "privacy-policy";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({
		locale,
		namespace: "privacyPolicy.meta",
	});
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${PAGE}`]),
	);

	return {
		title: t("title"),
		description: t("description"),
		alternates: {
			canonical: `/${locale}/${PAGE}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}/${PAGE}`,
			},
		},
	};
}

export default async function PrivacyPolicy() {
	const t = await getTranslations("privacyPolicy");

	return (
		<main className={`main ${styles.gdpr}`}>
			<Breadcrumbs links={[{ label: t("heading") }]} />
			<div className={styles.container}>
				<h1 className={styles["gdpr__title"]}>{t("heading")}</h1>
				<div>
					<p>FLOVAS s.r.o.</p>
					<p>Sídlo: Pod Hroby 271 Kolín IV</p>
					<p>IČO: {COMPANY_CODE}</p>
					<p>E-mail: {EMAIL}</p>
					<p>Telefon: {TEL}</p>
				</div>
				<p>{t("description")} www.flovas.cz</p>
				<ol className={styles.ol}>
					<li>
						{t("item1.heading")}
						<p>{t("item1.txt1")}</p>
						<p>{t("item1.txt2")}</p>
					</li>

					<li>
						{t("item2.heading")}
						<p>{t("item2.txt1")}</p>
						<ul className={styles.ul}>
							<li>{t("item2.txt2")}</li>
							<li>{t("item2.txt3")}</li>
							<li>{t("item2.txt4")}</li>
							<li>{t("item2.txt5")}</li>
							<li>{t("item2.txt6")}</li>
						</ul>
						<p>{t("item2.txt7")}</p>
					</li>
					<li>
						{t("item3.heading")}
						<p>{t("item3.txt1")}</p>
						<ol className={styles["ol-inner"]}>
							<li>{t("item3.txt2")}</li>
							<li>{t("item3.txt3")}</li>
							<li>{t("item3.txt4")}</li>
							<li>{t("item3.txt5")}</li>
						</ol>
					</li>
					<li>
						{t("item4.heading")}
						<p>{t("item4.txt1")}</p>
						<ul className={styles.ul}>
							<li>{t("item4.txt2")}</li>
							<li>{t("item4.txt3")}</li>
							<li>{t("item4.txt4")}</li>
						</ul>
					</li>
					<li>
						{t("item5.heading")}
						<p>{t("item5.txt1")}</p>
						<p>{t("item5.txt2")}</p>
						<p>{t("item5.txt3")}</p>
						<p>{t("item5.txt4")}</p>
					</li>
					<li>
						{t("item6.heading")}
						<p>{t("item6.txt1")}</p>
						<p>{t("item6.txt2")}</p>
						<p>{t("item6.txt3")}</p>
						<p>{t("item6.txt4")}</p>
					</li>
					<li>
						{t("item7.heading")}
						<p>{t("item7.txt1")}</p>
						<ul className={styles.ul}>
							<li>{t("item7.txt2")}</li>
							<li>{t("item7.txt3")}</li>
							<li>{t("item7.txt4")}</li>
							<li>{t("item7.txt5")}</li>
							<li>{t("item7.txt6")}</li>
							<li>{t("item7.txt7")}</li>
							<li>{t("item7.txt8")}</li>
							<li>{t("item7.txt9")}</li>
						</ul>
					</li>
					<li>
						{t("item8.heading")}
						<p>{t("item8.txt1")}</p>
						<p>{t("item8.txt2")}</p>
						<p>{t("item8.txt3")}</p>
						<p>{t("item8.txt4")}</p>
						<p>{t("item8.txt5")}</p>
						<p>{t("item8.txt6")}</p>
					</li>
					<li>
						{t("item9.heading")}
						<p>{t("item9.txt1")}</p>
						<div>
							<p>FLOVAS s.r.o.</p>
							<p>Sídlo: Pod Hroby 271 Kolín IV</p>
							<p>IČO: {COMPANY_CODE}</p>
							<p>E-mail: {EMAIL}</p>
							<p>Telefon: {TEL}</p>
						</div>
					</li>
				</ol>
			</div>
			<ScrollToTopBtn />
		</main>
	);
}
