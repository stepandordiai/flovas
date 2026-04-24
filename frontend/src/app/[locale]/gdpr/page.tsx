import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import ScrollToTopBtn from "@/components/ScrollToTopBtn/ScrollToTopBtn";
import CopyBtn from "@/components/CopyBtn/CopyBtn";
import { Locale } from "@/interfaces/Locale";
import styles from "./Gdpr.module.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const page = "gdpr";
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${page}`]),
	);

	return {
		title: `Zásady ochrany osobních údajů | flovas`,
		description:
			"Tyto zásady vysvětlují, jakým způsobem shromažďujeme, používáme a chráníme vaše osobní údaje v rámci zprostředkování zaměstnání a personální agendy.",
		alternates: {
			canonical: `/${locale}/${page}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}/${page}`,
			},
		},
	};
}

export default async function Gdpr() {
	const t = await getTranslations();

	return (
		<main className={`main ${styles.gdpr}`}>
			<Breadcrumbs links={[{ label: "Zásady ochrany osobních údajů" }]} />
			<div className={styles.container}>
				<h1 className={styles["gdpr__title"]}>{t("privacyPolicy.title")}</h1>
				<div>
					<p>{t("privacyPolicy.company")} FLOVAS s.r.o.</p>
					<p>
						{t("privacyPolicy.address")}{" "}
						<a href="https://maps.app.goo.gl/YsdJ4Lm1hQqYPuyt8" target="_blank">
							Pod Hroby 271 Kolín IV
						</a>
					</p>
					<p>
						IČO: <CopyBtn />
					</p>
				</div>
				<p>{t("privacyPolicy.txt1")}</p>
				<ol className={styles.ol}>
					<li>
						{t("privacyPolicy.txt2")}
						<p>{t("privacyPolicy.txt3")}</p>
					</li>

					<li>
						{t("privacyPolicy.txt4")}
						<p>{t("privacyPolicy.txt5")}</p>
						<ul className={styles.ul}>
							<li>{t("privacyPolicy.txt6")}</li>
							<li>{t("privacyPolicy.txt7")}</li>
							<li>{t("privacyPolicy.txt8")}</li>
							<li>{t("privacyPolicy.txt9")}</li>
						</ul>
					</li>
					<li>
						{t("privacyPolicy.txt10")}
						<p>{t("privacyPolicy.txt11")}</p>
						<ol className={styles["ol-inner"]}>
							<li>{t("privacyPolicy.txt12")}</li>
							<li>{t("privacyPolicy.txt13")}</li>
							<li>{t("privacyPolicy.txt14")}</li>
							<li>{t("privacyPolicy.txt15")}</li>
						</ol>
					</li>
					<li>
						{t("privacyPolicy.txt16")}
						<p>{t("privacyPolicy.txt17")}</p>
						<ul className={styles.ul}>
							<li>{t("privacyPolicy.txt18")}</li>
							<li>{t("privacyPolicy.txt19")}</li>
							<li>{t("privacyPolicy.txt20")}</li>
						</ul>
					</li>
					<li>
						{t("privacyPolicy.txt21")}
						<ul className={styles.ul}>
							<li>{t("privacyPolicy.txt22")}</li>
							<li>{t("privacyPolicy.txt23")}</li>
							<li>{t("privacyPolicy.txt24")}</li>
						</ul>
					</li>
					<li>
						{t("privacyPolicy.txt25")}
						<p>{t("privacyPolicy.txt26")}</p>
						<ul className={styles.ul}>
							<li>{t("privacyPolicy.txt27")}</li>
							<li>{t("privacyPolicy.txt28")}</li>
							<li>{t("privacyPolicy.txt29")}</li>
							<li>{t("privacyPolicy.txt30")}</li>
							<li>{t("privacyPolicy.txt31")}</li>
						</ul>
					</li>
					<li>
						{t("privacyPolicy.contact")}
						<p>{t("privacyPolicy.txt32")}</p>
						<ul className={styles.ul}>
							<li>
								Email: <a href="mailto:info@neresen.cz">info@neresen.cz</a>
							</li>
							<li>
								Telefon: <a href="tel:+420777957290">+420 777 957 290</a>
							</li>
						</ul>
					</li>
				</ol>
			</div>
			<ScrollToTopBtn />
		</main>
	);
}
