import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
import ScrollToTopBtn from "@/app/components/ScrollToTopBtn/ScrollToTopBtn";
import ScrollToTop from "@/app/utils/ScrollToTop";
import CopyBtn from "@/app/components/CopyBtn/CopyBtn";
import type { Metadata } from "next";
import { Locale } from "@/app/interfaces/Locale";
import styles from "./Gdpr.module.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const baseUrl = "https://www.flovas.cz";

	return {
		title: `Zásady ochrany osobních údajů | flovas`,
		description:
			"Tyto zásady vysvětlují, jakým způsobem shromažďujeme, používáme a chráníme vaše osobní údaje v rámci zprostředkování zaměstnání a personální agendy.",
		alternates: {
			canonical: `${baseUrl}/${locale}/gdpr`,
			languages: {
				uk: `${baseUrl}/uk/gdpr`,
				cs: `${baseUrl}/cs/gdpr`,
				sk: `${baseUrl}/sk/gdpr`,
				en: `${baseUrl}/en/gdpr`,
				"x-default": `${baseUrl}/uk/gdpr`,
			},
		},
	};
}

const Gdpr = () => {
	return (
		<>
			<ScrollToTop />
			<main className={`main ${styles.gdpr}`}>
				<Breadcrumbs links={[{ label: "Zásady ochrany osobních údajů" }]} />
				<div className={styles.container}>
					<h1 className={styles["gdpr__title"]}>
						Zásady ochrany osobních údajů (GDPR)
					</h1>
					<div>
						<p>Společnost: FLOVAS s.r.o.</p>
						<p>
							Sídlo:{" "}
							<a
								href="https://maps.app.goo.gl/YsdJ4Lm1hQqYPuyt8"
								target="_blank"
							>
								Pod Hroby 271 Kolín IV
							</a>
						</p>
						<p>
							IČO: <CopyBtn />
						</p>
					</div>
					<p>
						Tyto zásady vysvětlují, jakým způsobem shromažďujeme, používáme a
						chráníme vaše osobní údaje v rámci zprostředkování zaměstnání a
						personální agendy.
					</p>
					<ol className={styles.ol}>
						<li>
							Kdo je správcem vašich údajů?
							<p>
								Správcem osobních údajů je společnost FLOVAS s.r.o. Odpovídáme
								za to, aby vaše údaje byly zpracovávány zákonně, transparentně a
								bezpečně v souladu s nařízením EU 2016/679 (GDPR).
							</p>
						</li>

						<li>
							Jaké údaje shromažďujeme?
							<p>
								Pro účely nalezení vhodné pracovní pozice a uzavření
								pracovněprávního vztahu zpracováváme zejména:
							</p>
							<ul className={styles.ul}>
								<li>
									Identifikační údaje: jméno, příjmení, datum narození, státní
									občanství.
								</li>
								<li>
									Kontaktní údaje: telefonní číslo, e-mail, adresa bydliště.
								</li>
								<li>
									Profesní údaje: životopis (CV), informace o vzdělání,
									předchozích pracovních zkušenostech a dovednostech.
								</li>
								<li>
									Doklady: kopie víz, povolení k pobytu, údaje z pasu (nezbytné
									pro zákonnou registraci zaměstnance).
								</li>
							</ul>
						</li>
						<li>
							Účel a právní základ zpracování
							<p>Vaše údaje zpracováváme na základě těchto právních titulů:</p>
							<ol className={styles["ol-inner"]}>
								<li>
									Plnění smlouvy či provedení opatření před uzavřením smlouvy:
									abychom vám mohli zprostředkovat práci a uzavřít smlouvu.
								</li>
								<li>
									Plnění právní povinnosti: hlášení na úřady (Úřad práce, OSSZ,
									zdravotní pojišťovny) a daňová agenda.
								</li>
								<li>
									Souhlas: pro uchování v databázi uchazečů pro budoucí pracovní
									nabídky.
								</li>
								<li>
									Oprávněný zájem: pro ochranu našich práv v případě právních
									sporů.
								</li>
							</ol>
						</li>
						<li>
							Komu vaše údaje předáváme?
							<p>Vaše údaje mohou být poskytnuty:</p>
							<ul className={styles.ul}>
								<li>
									Zaměstnavatelům (klientům): potenciálním firmám, u kterých se
									ucházíte o práci.
								</li>
								<li>
									Státním orgánům: Úřad práce ČR, Celní správa, zdravotní
									pojišťovny a správa sociálního zabezpečení.
								</li>
								<li>
									Zpracovatelům: externím účetním a mzdovým firmám či
									poskytovatelům IT služeb.
								</li>
							</ul>
						</li>
						<li>
							Doba uchovávání údajů
							<ul className={styles.ul}>
								<li>Po dobu výběrového řízení na konkrétní pozici.</li>
								<li>
									Po dobu trvání pracovního poměru a následně po dobu 10 let
									(dle archivačních lhůt daných českými zákony).
								</li>
								<li>
									3 roky na základě vašeho souhlasu (pro účely budoucích
									nabídek), pokud souhlas neodvoláte dříve.
								</li>
							</ul>
						</li>
						<li>
							Vaše práva
							<p>Máte právo:</p>
							<ul className={styles.ul}>
								<li>Požadovat přístup ke svým osobním údajům.</li>
								<li>Na opravu neúplných či nesprávných údajů.</li>
								<li>Na výmaz údajů („právo být zapomenut“).</li>
								<li>Kdykoliv odvolat svůj souhlas se zpracováním.</li>
								<li>
									Podat stížnost u Úřadu pro ochranu osobních údajů (ÚOOÚ).
								</li>
							</ul>
						</li>
						<li>
							Kontakt
							<p>V případě dotazů ohledně GDPR nás můžete kontaktovat:</p>
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
		</>
	);
};

export default Gdpr;
