import Link from "next/link";

const NotFound = () => {
	return (
		<>
			<div className="not-found">
				<span style={{ fontWeight: 500, fontSize: "3rem" }}>404</span>
				<span>Сторінку не знайдено</span>
				<Link className="not-found__link" href="/">
					Повернутись на головну
				</Link>
			</div>
		</>
	);
};

export default NotFound;
