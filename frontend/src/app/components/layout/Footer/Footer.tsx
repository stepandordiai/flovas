import { getTranslations } from "next-intl/server";
import linksData from "@/app/lib/data/links-data.json";
import socialsData from "@/app/lib/data/socialsData";
import { Link } from "@/i18n/navigation";
import "./Footer.scss";

const Footer = async () => {
	const t = await getTranslations();

	return (
		<footer className="footer">
			<div className="footer-inner">
				<div className="footer-top">
					<p className="footer__logo">flovas</p>
					<div className="footer__socials">
						{socialsData.map((social) => {
							const Icon = social.socialImg;
							return (
								<a
									key={social.id}
									href={social.socialUrl}
									title={social.title}
									target="_blank"
								>
									<Icon size={40} />
								</a>
							);
						})}
					</div>
				</div>
				<div className="footer__nav-container">
					<div className="footer__nav">
						<p className="footer__nav-title">{t("footer.nav")}</p>
						<div className="footer__nav-list">
							{linksData.map((link: any, index: any) => {
								return (
									<Link key={index} href={link.path}>
										{t(link.name)}
									</Link>
								);
							})}
						</div>
					</div>
					<div className="footer__nav">
						<p className="footer__nav-title">{t("contact_us_title")}</p>
						<div className="footer__nav-list">
							<a href="tel:+420777957290">+420 777 957 290</a>
							<a href="mailto:info@neresen.cz">info@neresen.cz</a>
						</div>
					</div>
					<div className="footer__nav">
						<p className="footer__nav-title">{t("footer.working_hours")}</p>
						<div className="footer__nav-list">
							<p>
								{t("footer.mon")} - {t("footer.sat")}: 8:00 - 17:00
							</p>
							<p>
								{t("footer.sunday")}: {t("footer.closed")}
							</p>
						</div>
					</div>
					<div className="footer__nav">
						<p className="footer__nav-title">{t("followUs")}</p>
						<div className="footer__nav-list">
							{socialsData.map((social) => {
								return (
									<a key={social.id} href={social.socialUrl} target="_blank">
										{social.title}
									</a>
								);
							})}
						</div>
					</div>
					<div className="footer__nav">
						<p className="footer__nav-title">FLOVAS s.r.o.</p>
						<div className="footer__nav-list">
							<Link href="/gdpr">Zásady ochrany osobních údajů</Link>
						</div>
					</div>
				</div>
			</div>
			{/* FIXME: */}
			<div
				className="footer-bottom__slider"
				style={
					{
						"--width": "300px",
						"--quantity": "6",
						// TODO: learn this
					} as React.CSSProperties
				}
			>
				<div className="footer-bottom__list">
					<div
						className="footer-bottom__item"
						style={{ "--position": "1" } as React.CSSProperties}
					>
						<p>&copy; 2025&ndash;{new Date().getFullYear()} FLOVAS s.r.o.</p>
					</div>
					<div
						className="footer-bottom__item"
						style={{ "--position": "2" } as React.CSSProperties}
					>
						<p>{t("footer.all_rights_reserved")}</p>
					</div>
					<div
						className="footer-bottom__item"
						style={{ "--position": "3" } as React.CSSProperties}
					>
						<p>
							Website created by{" "}
							<a href="https://www.heeeyooo.studio/" target="_blank">
								heeeyooo studio
							</a>
						</p>
					</div>
					<div
						className="footer-bottom__item"
						style={{ "--position": "4" } as React.CSSProperties}
					>
						<p>&copy; 2025&ndash;{new Date().getFullYear()} FLOVAS s.r.o.</p>
					</div>
					<div
						className="footer-bottom__item"
						style={{ "--position": "5" } as React.CSSProperties}
					>
						<p>{t("footer.all_rights_reserved")}</p>
					</div>
					<div
						className="footer-bottom__item"
						style={{ "--position": "6" } as React.CSSProperties}
					>
						<p>
							Website created by{" "}
							<a href="https://www.heeeyooo.studio/" target="_blank">
								heeeyooo studio
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
