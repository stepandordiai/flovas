import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import FloatingContact from "../components/FloatingContact/FloatingContact";
import { Montserrat } from "next/font/google";
import ScrollToTop from "../utils/ScrollToTop";
import "@/app/scss/globals.scss";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin", "cyrillic"],
});

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
