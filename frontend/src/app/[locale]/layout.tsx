import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import FloatingContact from "@/components/FloatingContact/FloatingContact";
import ScrollToTop from "@/utils/ScrollToTop";
import { BASE_URL } from "@/lib/constants";
import "@/scss/globals.scss";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin", "cyrillic"],
});

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return {
		metadataBase: new URL(BASE_URL),

		// TODO: learn this
		openGraph: {
			title: t("logoTitle"),
			description: t("home.meta.title"),
			url: `/${locale}`,
			type: "website",
			images: "/flovas-og-c.png",
		},
		verification: {
			other: {
				"facebook-domain-verification": "udzqiysp77rlobdsbp6k9ojm5k8in4",
			},
		},
	};
}

type LocaleLayoutProps = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
	children,
	params,
}: Readonly<LocaleLayoutProps>) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	const t = await getTranslations({ locale });

	// TODO: learn this
	// EmploymentAgency
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "EmploymentAgency",
		name: "flovas",
		url: `${BASE_URL}/${locale}`,
		description: t("about.desc"),
		logo: `${BASE_URL}/flovas-og-c.png`,
		telephone: "+420777957290",
		address: {
			"@type": "PostalAddress",
			streetAddress: "Pod Hroby 271",
			addressLocality: "Kolín",
			addressCountry: "CZ",
		},
		sameAs: [
			"https://www.facebook.com/flovas.agentura/",
			"https://www.instagram.com/flovas.cz/",
			"https://www.tiktok.com/@flovas.cz",
		],
	};

	return (
		<html lang={locale}>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className={montserrat.variable}>
				<ScrollToTop />
				<NextIntlClientProvider locale={locale}>
					<FloatingContact />
					<Header />
					{children}
					<div className="empty-div"></div>
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
