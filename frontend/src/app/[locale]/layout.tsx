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
		metadataBase: new URL("https://www.flovas.cz"),

		// TODO: learn this
		openGraph: {
			title: t("logoTitle"),
			description: t("home.meta.title"),
			url: `/${locale}`,
			type: "website",
			images: "/flovas-og-c.png",
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

	const t = await getTranslations({ locale });

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang={locale}>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "EmploymentAgency",
							name: "flovas",
							url: `https://www.flovas.cz/${locale}`,
							description: t("home.meta.description"),
						}),
					}}
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
