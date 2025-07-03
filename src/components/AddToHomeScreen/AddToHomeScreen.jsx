import img from "/Home Screen Widgets - iPhone.png";
import shareIcon from "/icons/share.png";
import "./AddToHomeScreen.scss";

const AddToHomeScreen = () => {
	return (
		<>
			<div className="add-to-home-screen">
				<h2 className="add-to-home-screen__title">
					flovas агенція у вашому смартфоні
				</h2>
				<div className="add-to-home-screen__container">
					<img width={200} src={img} alt="Flovas app sample on mobile" />
					<ul className="add-to-home-screen__list">
						<li>
							Відкрийте{" "}
							<a href="https://flovas.netlify.app/" target="_blank">
								www.flovas.cz
							</a>{" "}
							у браузері Safari або Chrome (Android)
						</li>
						<li>
							Натисніть на значок <img width={20} src={shareIcon} alt="" />{" "}
							«Поділитися» внизу вікна або три крапки у верхньому правому куті
							(Android)
						</li>
						<li>
							Прокрутіть вниз, виберіть «На екран Додому» і натисніть «Додати»
						</li>
						<li>
							Готово! Веб-додаток{" "}
							<a href="https://flovas.netlify.app/" target="_blank">
								www.flovas.cz
							</a>{" "}
							з'явиться поряд з іншими програмами
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default AddToHomeScreen;
