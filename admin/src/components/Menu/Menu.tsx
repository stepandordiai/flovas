import { useState } from "react";
import { NavLink } from "react-router-dom";
import HouseIcon from "../icons/HouseIcon";
import CollectionIcon from "../icons/CollectionIcon";
import PeopleIcon from "../icons/PeopleIcon";
import { supabase } from "../../lib/supabase";
import "./styles.scss";

const Menu = () => {
	const [menuVisible, setMenuVisible] = useState(false);

	// TODO: LEARN THIS
	const handleLogout = async () => {
		await supabase.auth.signOut();
	};

	return (
		<>
			<button
				onClick={() => setMenuVisible((prev) => !prev)}
				type="button"
				className="menu__btn"
			>
				меню
			</button>
			<div className={`menu ${menuVisible ? "menu--visible" : ""}`}>
				<button
					style={{ alignSelf: "flex-end" }}
					type="button"
					onClick={() => setMenuVisible(false)}
				>
					Закрити
				</button>
				<nav className="sidebar-nav">
					<NavLink
						className={({ isActive }) =>
							`sidebar-nav__link ${isActive ? "sidebar-nav__link--active" : ""}`
						}
						to="/"
					>
						<HouseIcon />
						<span>Головна</span>
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							`sidebar-nav__link ${isActive ? "sidebar-nav__link--active" : ""}`
						}
						to="/vacancies"
					>
						<CollectionIcon />
						<span>Вакансії</span>
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							`sidebar-nav__link ${isActive ? "sidebar-nav__link--active" : ""}`
						}
						to="/leads"
					>
						<PeopleIcon />
						<span>Ліди</span>
					</NavLink>
				</nav>

				<button className="logout-btn" onClick={handleLogout}>
					Вийти
				</button>
				<p style={{ alignSelf: "center" }}>
					by{" "}
					<a
						href="https://www.heeeyooo.com/en"
						target="_blank"
						rel="noopener noreferrer"
					>
						heeeyooo studio
					</a>
				</p>
			</div>
		</>
	);
};

export default Menu;
