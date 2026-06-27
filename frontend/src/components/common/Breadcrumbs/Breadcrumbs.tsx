import HomeIcon from "@/components/icons/HomeIcon";
import { Link } from "@/i18n/navigation";
import { BASE_URL } from "@/lib/constants";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import "./Breadcrumbs.scss";

interface Breadcrumb {
	label: string;
	href?: string;
}

type BreadcrumbsProps = {
	links: Breadcrumb[];
};

export default function Breadcrumbs({ links }: BreadcrumbsProps) {
	const t = useTranslations();
	const locale = useLocale();

	// TODO: learn this
	// BreadcrumbList
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: t("home_title"),
				item: `${BASE_URL}/${locale}`,
			},
			...links.map((link, i) => ({
				"@type": "ListItem",
				position: i + 2, // +2 because Home is position 1
				name: link.label,
				...(link.href && { item: `${BASE_URL}/${locale}${link.href}` }),
			})),
		],
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<nav className="breadcrumbs">
				<ol className="breadcrumbs-list">
					<li>
						<Link className="breadcrumbs__link" href="/">
							<HomeIcon size={20} />
						</Link>
						<span>•</span>
					</li>
					{links.map((link, i) => {
						const isLastLink = i === links.length - 1;

						return (
							<li key={i}>
								{!isLastLink && link.href ? (
									<>
										<Link className="breadcrumbs__link" href={link.href}>
											{link.label}
										</Link>
										<span>•</span>
									</>
								) : (
									<span className="breadcrumbs__link">{link.label}</span>
								)}
							</li>
						);
					})}
				</ol>
			</nav>
		</>
	);
}
