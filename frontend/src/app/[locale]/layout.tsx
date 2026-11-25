import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
		title: {
			template: "%s | flovas",
			default: "flovas",
		},

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

// TODO: LEARN THIS
export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

// TODO: LEARN THIS
export const dynamicParams = false;

type LocaleLayoutProps = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
	children,
	params,
}: Readonly<LocaleLayoutProps>) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) notFound();

	// TODO: LEARN THIS
	setRequestLocale(locale);

	return (
		<html lang={locale}>
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
