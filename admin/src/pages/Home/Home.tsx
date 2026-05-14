import "./Home.scss";

interface Lead {
	id: string;
	name: string;
	tel: string;
	address: string;
	position: string;
	message: string;
}

type HomeProps = {
	leads: Lead[];
};

const Home = ({ leads }: HomeProps) => {
	return (
		<main className="main">
			<h1>Головна</h1>
			<div className="home-inner">
				<div className="home-container">
					<p>Вакансії</p>
					<p>26</p>
				</div>
				<div className="home-container">
					<p>{leads.length}</p>
					<p>Ліди</p>
				</div>
			</div>
		</main>
	);
};

export default Home;
