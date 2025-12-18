import "./Footer.scss";

const Footer = () => {
	return (
		<footer>
			<div>
				<p>Переконайтеся, що інформація актуальна.</p>
				<a href="https://www.flovas.cz/" target="_blank">
					www.flovas.cz
				</a>
			</div>
			<div className="iframe-container">
				<iframe
					className="iframe"
					src="https://www.flovas.cz/"
					frameborder="0"
				></iframe>
			</div>
			<p className="creator">
				Created by{" "}
				<a href="https://www.heeeyooo.studio/" target="_blank">
					heeeyooo studio
				</a>
			</p>
		</footer>
	);
};

export default Footer;
