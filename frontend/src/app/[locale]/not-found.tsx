// import Link from "next/link";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
	return (
		<main className="not-found">
			<span style={{ fontWeight: 500, fontSize: "clamp(6rem, 16vw, 12rem)" }}>
				404
			</span>
			<h1 style={{ fontWeight: 500, fontSize: "clamp(1rem, 2vw, 2rem)" }}>
				Сторінку не знайдено
			</h1>
			<p style={{ textAlign: "center" }}>
				На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.
				Скористайтеся меню або поверніться на головну сторінку.
			</p>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					gap: 5,
				}}
			>
				<Link className="not-found__link" href="/">
					Повернутись на головну
				</Link>
				<Link className="not-found__link" href="/prace">
					Вакансії
				</Link>
			</div>
		</main>
	);
}
