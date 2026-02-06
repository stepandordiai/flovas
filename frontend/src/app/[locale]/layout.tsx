import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Header from "../components/common/Header/Header";
import Footer from "../components/common/Footer/Footer";
import { Locale } from "../interfaces/Locale";
import FloatingContact from "../components/FloatingContact/FloatingContact";

// TODO: LEARN THIS
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const baseUrl = "https://www.flovas.cz";

	const lngUrls: Record<Locale, string> = {
		uk: `${baseUrl}/uk`,
		cs: `${baseUrl}/cs`,
		sk: `${baseUrl}/sk`,
		en: `${baseUrl}/en`,
	};

	return {
		alternates: {
			canonical: `${baseUrl}/${locale}`,
			languages: {
				...lngUrls,
				"x-default": `${baseUrl}/uk`,
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

	return (
		<NextIntlClientProvider locale={locale}>
			<FloatingContact />
			<Header />
			{children}
			<div className="empty-div"></div>
			<Footer />
		</NextIntlClientProvider>
	);
}
