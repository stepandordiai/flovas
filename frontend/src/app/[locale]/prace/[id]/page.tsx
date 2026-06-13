import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getVacancies } from "@/services/vacancies";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import Image from "next/image";
import CopyBtn from "@/components/CopyBtn/CopyBtn";
import VacancyPageClient from "./VacancyPageClient";
import { Link } from "@/i18n/navigation";
import { VacancyInterface } from "@/interfaces/Vacancy";
import getUpdatedDate from "@/utils/getUpdatedDate";
import ClockIcon from "@/components/icons/ClockIcon";
import "./VacancyPage.scss";

export async function generateStaticParams() {
	const { data: vacancies, error } = await getVacancies();

	if (!vacancies || error) return [];

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

	const { data: vacancies, error } = await getVacancies();

	if (!vacancies || error) return {};

	const vacancy = vacancies.find((vacancy) => vacancy.id === id);

	if (!vacancy) {
		return {
			title: "404",
		};
	}

	// const seoDesc = vacancy.benefits
	// 	.map((item: string) => item.replace(/^\p{Emoji}\s*/u, "").trim())
	// 	.join(" · ")
	// 	.slice(0, 160);

	const page = "prace";
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${page}/${id}`]),
	);

	return {
		title: vacancy.title,
		description: vacancy.description,

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
			description: vacancy.description,
			url: `/${locale}/${page}/${id}`,
			type: "website",
			images: [
				{
					url: vacancy.img || "/flovas-og-c.png",
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

	const { data: vacancies, error } = await getVacancies();

	if (error) return <div>Error loading vacancies</div>;
	if (!vacancies) return <div>No vacancies found</div>;

	const vacancy: VacancyInterface = vacancies.find(
		(vacancy) => vacancy.id === id,
	);

	// const seoDesc = vacancy.benefits
	// 	.map((item: string) => item.replace(/^\p{Emoji}\s*/u, "").trim())
	// 	.join(" · ");

	// TODO: learn this
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "JobPosting",
		title: vacancy.title,
		description: vacancy.description,
		datePosted: vacancy.updated_at,
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

	if (!vacancy) {
		return notFound();
	}

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
							alt={vacancy.title}
							priority
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
							<p
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									gap: "5px",
								}}
							>
								<ClockIcon />{" "}
								<span>Оновлено {getUpdatedDate(vacancy.updated_at)}</span>
							</p>
							<VacancyPageClient />
						</div>
						<h1 className="vacancy__title">{vacancy.title}</h1>

						<p className="vacancy-page__details-title">
							Місто: {vacancy.place}
						</p>
						{vacancy.address && (
							<div>
								<span className="vacancy-page__details-title">Адреса: </span>
								<a href={vacancy.address_url} target="_blank">
									{vacancy.address}
								</a>{" "}
								<CopyBtn txt={vacancy.address} />
							</div>
						)}
						<p className="vacancy-page__details-title">
							Заробітна плата: {vacancy.salary} Kč/год
						</p>
						{vacancy.description && (
							<>
								<p className="vacancy-page__details-title">Опис:</p>
								<p>{vacancy.description}</p>
							</>
						)}

						<p className="vacancy-page__details-title">Що ми пропонуємо:</p>
						<ul className="vacancy-page-list">
							{vacancy.benefits.map((el, i) => {
								return <li key={i}>{el}</li>;
							})}
						</ul>
						{vacancy.responsibilities &&
							vacancy.responsibilities.length > 0 && (
								<>
									<p className="vacancy-page__details-title">Обов'язки:</p>
									<ul className="vacancy-page-list">
										{vacancy.responsibilities.map((el, i) => {
											return <li key={i}>{el}</li>;
										})}
									</ul>
								</>
							)}
						{vacancy.requirements && vacancy.requirements.length > 0 && (
							<>
								<p className="vacancy-page__details-title">Вимоги:</p>
								<ul className="vacancy-page-list">
									{vacancy.requirements.map((el, i) => {
										return <li key={i}>{el}</li>;
									})}
								</ul>
							</>
						)}
						{vacancy.badges && vacancy.badges.length > 0 && (
							<ul
								style={{
									display: "flex",
									flexWrap: "wrap",
									gap: "5px",
									background: "var(--bg-lighter-clr)",
									padding: "10px",
									borderRadius: "25px",
								}}
							>
								{vacancy.badges.map((el) => {
									return (
										<li
											key={el}
											style={{
												background: "#fff",
												padding: "5px",
												borderRadius: "10px",
											}}
										>
											{el}
										</li>
									);
								})}
							</ul>
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
