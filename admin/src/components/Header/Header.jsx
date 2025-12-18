import "./Header.scss";

const Header = () => {
	return (
		<header>
			<p className="header__logo">
				<span style={{ fontWeight: 500 }}>flovas</span>{" "}
				<span style={{ fontWeight: 300 }}>агенція</span> (<span>admin</span>)
			</p>
		</header>
	);
};

export default Header;
