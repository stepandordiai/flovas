import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import vacancies from "@/data/vacancies.json";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import Image from "next/image";
import CopyBtn from "@/components/CopyBtn/CopyBtn";
import VacancyPageClient from "./VacancyPageClient";
import { Link } from "@/i18n/navigation";
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

	// TODO: learn this
	const seoDesc = vacancy.desc
		.map((item: string) => item.replace(/^\p{Emoji}\s*/u, "").trim())
		.join(" · ")
		.slice(0, 160);

	const page = "prace";
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${page}/${id}`]),
	);

	return {
		title: vacancy.title,
		description: seoDesc,

		alternates: {
			canonical: `/${locale}/${page}/${id}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}/${page}/${id}`,
			},
		},

		// TODO: learn this
		openGraph: {
			title: vacancy.title,
			description: seoDesc,
			url: `/${locale}/${page}/${id}`,
			type: "website",
			images: [
				{
					// url: "/flovas-og-c.png",
					url: vacancy.img,
					width: 630,
					height: 630,
					alt: vacancy.title,
				},
			],
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

	const seoDesc = vacancy.desc
		.map((item: string) => item.replace(/^\p{Emoji}\s*/u, "").trim())
		.join(" · ");

	// TODO: learn this
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "JobPosting",
		title: vacancy.title,
		description: seoDesc,
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
				addressCountry: "CZ",
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
							// TODO: ?
							width={500}
							height={500}
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
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								flexWrap: "wrap",
								gap: 10,
							}}
						>
							<p>Опубліковано: {vacancy.createdAt.replaceAll("-", "/")}</p>
							<VacancyPageClient />
						</div>
						<h1 className="vacancy__title">{vacancy.title}</h1>

						<p className="vacancy-page__details-title">
							Місто: {vacancy.place}
						</p>
						{vacancy.address && (
							<div>
								<span className="vacancy-page__details-title">Адреса: </span>
								<a href={vacancy.addressUrl} target="_blank">
									{vacancy.address}
								</a>{" "}
								<CopyBtn txt={vacancy.address} />
							</div>
						)}
						<p className="vacancy-page__details-title">
							Заробітна плата: {vacancy.salary} Kč/год
						</p>
						<p className="vacancy-page__details-title">Опис:</p>
						<ul>
							{vacancy.desc.map((el, i) => {
								return <li key={i}>{el}</li>;
							})}
						</ul>
						{vacancy.requirements && (
							<>
								<p className="vacancy-page__details-title">Вимоги:</p>
								<ul>
									{vacancy.requirements.map((el, i) => {
										return <li key={i}>{el}</li>;
									})}
								</ul>
							</>
						)}
						<div style={{ display: "flex", gap: 5, alignSelf: "flex-end" }}>
							<Link className="vacancy-page__link" href="/#kontakty">
								{t("contacts_title")}
							</Link>
							<a className="vacancy-page__link" href="tel:+420777957290">
								Дзвоніть зараз
							</a>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
