import { Montserrat } from "next/font/google";
import "@/app/scss/globals.scss";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin", "cyrillic"],
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body className={montserrat.variable}>{children}</body>
		</html>
	);
}
