import HomeIcon from "@/app/icons/HomeIcon";
import { Link } from "@/i18n/navigation";
import "./Breadcrumbs.scss";

interface Breadcrumb {
	label: string;
	href?: string;
}

type BreadcrumbsProps = {
	links: Breadcrumb[];
};

const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
	return (
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
	);
};

export default Breadcrumbs;
