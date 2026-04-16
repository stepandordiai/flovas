import { getTranslations } from "next-intl/server";
import linksData from "@/data/links-data.json";
import socialsData from "@/data/socialsData";
import { Link } from "@/i18n/navigation";
import { CSSProperties } from "react";
import "./Footer.scss";

const Footer = async () => {
	const t = await getTranslations();

	return (
		<footer className="footer">
			<div className="footer-inner">
				<div className="footer-top">
					<p className="footer__logo">flovas</p>
				</div>
				<div className="footer__nav-container">
					<div className="footer__nav">
						<p className="footer__nav-title">{t("footer.nav")}</p>
						<div className="footer__nav-list">
							{linksData.map((link, index) => {
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
							<span>
								{t("footer.mon")} - {t("footer.sat")}: 8:00 - 19:00
							</span>
							<span>
								{t("footer.sunday")}: {t("footer.closed")}
							</span>
						</div>
					</div>
					<div className="footer__nav">
						<p className="footer__nav-title">{t("followUs")}</p>
						<div className="footer__nav-list">
							{socialsData.map((social, i) => {
								const Icon = social.icon;
								return (
									<a
										key={i}
										className="footer__social-link"
										href={social.url}
										target="_blank"
									>
										<Icon />
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
					} as CSSProperties
				}
			>
				<div className="footer-bottom__list">
					<div
						className="footer-bottom__item"
						style={{ "--position": "1" } as CSSProperties}
					>
						<p>&copy; 2025&ndash;{new Date().getFullYear()} FLOVAS s.r.o.</p>
					</div>
					<div
						className="footer-bottom__item"
						style={{ "--position": "2" } as CSSProperties}
					>
						<p>{t("footer.all_rights_reserved")}</p>
					</div>
					<div
						className="footer-bottom__item"
						style={{ "--position": "3" } as CSSProperties}
					>
						<p>
							Website created by{" "}
							<a href="https://www.heeeyooo.com" target="_blank">
								heeeyooo studio
							</a>
						</p>
					</div>
					<div
						className="footer-bottom__item"
						style={{ "--position": "4" } as CSSProperties}
					>
						<p>&copy; 2025&ndash;{new Date().getFullYear()} FLOVAS s.r.o.</p>
					</div>
					<div
						className="footer-bottom__item"
						style={{ "--position": "5" } as CSSProperties}
					>
						<p>{t("footer.all_rights_reserved")}</p>
					</div>
					<div
						className="footer-bottom__item"
						style={{ "--position": "6" } as CSSProperties}
					>
						<p>
							Website created by{" "}
							<a href="https://www.heeeyooo.com" target="_blank">
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
