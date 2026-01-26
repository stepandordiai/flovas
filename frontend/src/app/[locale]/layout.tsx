import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "@/app/scss/globals.scss";
import { getVacanciesData } from "../lib/api/api";
import { VacancyInterface } from "../interfaces/Vacancy";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
	title: "Працевлаштування в Чехії для українців | flovas",
	description:
		"Робота в Чехії для українців. FLOVAS s.r.o. — кадрова агенція з легальним працевлаштуванням, житлом і допомогою з документами по всій Чехії.",
};

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

	const vacancies =
		await getVacanciesData<VacancyInterface[]>("/api/vacancies");
	return (
		<html lang={locale}>
			<body className={montserrat.variable}>
				<NextIntlClientProvider>
					<Header vacancies={vacancies} />
					{children}
					<div className="empty-div"></div>
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
