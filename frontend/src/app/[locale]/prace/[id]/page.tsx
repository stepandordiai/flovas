import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import vacancies from "./../../../lib/data/vacancies.json";
import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
import Image from "next/image";
import "./VacancyPage.scss";

export async function generateStaticParams() {
	return routing.locales.flatMap((locale) =>
		vacancies.map((vacancy) => ({
			locale,
			id: vacancy.id,
		})),
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
	const { locale, id } = await params;

	const vacancy = vacancies.find((vacancy) => vacancy.id === id);

	if (!vacancy) {
		return {
			title: "404",
		};
	}

	const page = "prace";
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${page}/${id}`]),
	);

	return {
		title: vacancy.title,
		description: vacancy.desc.slice(0, 160),

		alternates: {
			canonical: `/${locale}/${page}/${id}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}/${page}/${id}`,
			},
		},
	};
}

type VacancyPageProps = {
	params: Promise<{ id: string; locale: string }>;
};

export default async function VacancyPage({ params }: VacancyPageProps) {
	const { id, locale } = await params;

	const t = await getTranslations({ locale });

	const vacancy = vacancies.find((vacancy) => vacancy.id === id);

	if (!vacancy) {
		return notFound();
	}

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "JobPosting",
		title: vacancy.title,
		description: vacancy.desc,
		datePosted: vacancy.createdAt,
		employmentType: "FULL_TIME", // PART_TIME, CONTRACTOR, TEMPORARY, INTERN
		hiringOrganization: {
			"@type": "Organization",
			name: "flovas",
			url: `https://www.flovas.cz/${locale}`,
		},
		jobLocation: {
			"@type": "Place",
			address: {
				"@type": "PostalAddress",
				addressCountry: "Прага",
				addressLocality: vacancy.place,
			},
		},
		baseSalary: {
			"@type": "MonetaryAmount",
			currency: "CZK",
			value: {
				"@type": "QuantitativeValue",
				value: vacancy.salary,
				unitText: "MONTH",
			},
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<main className="main vacancy-page">
				<Breadcrumbs
					links={[
						{ label: t("vacancies_title"), href: "/prace" },
						{ label: vacancy.title },
					]}
				/>
				<div className="vacancy-page__details">
					{vacancy.img ? (
						<Image
							className="vacancy-page__img"
							src={vacancy.img}
							width={1024}
							height={1024}
							alt={vacancy.id}
						/>
					) : (
						<div className="vacancy-page__no-img"></div>
					)}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							rowGap: 10,
						}}
					>
						<h1 className="vacancy__title">{vacancy.title}</h1>
						<p className="vacancy__created-at">
							Опубліковано: {vacancy.createdAt}
						</p>
						<p style={{ fontSize: "18px", fontWeight: 600 }}>
							📍 {vacancy.place}
						</p>
						<p style={{ fontSize: "18px", fontWeight: 600 }}>
							{vacancy.salary}
						</p>
						<p style={{ whiteSpace: "pre-wrap", fontSize: "18px" }}>
							{vacancy.desc}
						</p>
						<a className="vacancy-page__link" href="tel:+420777957290">
							Дзвоніть зараз
						</a>
					</div>
				</div>
			</main>
		</>
	);
}
