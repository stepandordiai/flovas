import { NavLink } from "react-router-dom";
import HouseIcon from "../../icons/HouseIcon";
import { useState } from "react";
import PeopleIcon from "../../icons/PeopleIcon";
import CollectionIcon from "../../icons/CollectionIcon";
import CollapseIcon from "../../icons/CollapseIcon";
import { supabase } from "../../../lib/supabase";
import "./styles.scss";

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(false);

	// TODO: LEARN THIS
	const handleLogout = async () => {
		await supabase.auth.signOut();
	};

	return (
		<aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}>
			<div className="sidebar-top">
				<NavLink className="sidebar__logo" to="/">
					<img src="/icon.svg" width={50} alt="" />
					<span className={collapsed ? "label" : ""}>flovas (admin)</span>
				</NavLink>
				<button
					className="sidebar__collapse-btn"
					onClick={() => setCollapsed((prev) => !prev)}
				>
					<CollapseIcon />
				</button>
			</div>
			<nav className="sidebar-nav">
				<NavLink
					className={({ isActive }) =>
						`sidebar-nav__link ${isActive ? "sidebar-nav__link--active" : ""}`
					}
					to={"/"}
				>
					<HouseIcon />
					<span className={collapsed ? "label" : ""}>Головна</span>
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						`sidebar-nav__link ${isActive ? "sidebar-nav__link--active" : ""}`
					}
					to={"/vacancies"}
				>
					<CollectionIcon />
					<span className={collapsed ? "label" : ""}>Вакансії</span>
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						`sidebar-nav__link ${isActive ? "sidebar-nav__link--active" : ""}`
					}
					to={"/leads"}
				>
					<PeopleIcon />
					<span className={collapsed ? "label" : ""}>Ліди</span>
				</NavLink>
			</nav>

			<button className="logout-btn" onClick={handleLogout}>
				Вийти
			</button>
		</aside>
	);
};

export default Sidebar;
