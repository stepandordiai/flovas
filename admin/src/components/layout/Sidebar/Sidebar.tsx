import { NavLink } from "react-router-dom";
import "./styles.scss";
import HouseIcon from "../../icons/HouseIcon";
import { useState } from "react";
import PeopleIcon from "../../icons/PeopleIcon";
import CollectionIcon from "../../icons/CollectionIcon";
import CollapseIcon from "../../icons/CollapseIcon";

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(false);

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
		</aside>
	);
};

export default Sidebar;
