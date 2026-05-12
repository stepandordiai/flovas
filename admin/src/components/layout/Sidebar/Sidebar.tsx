import { NavLink } from "react-router-dom";
import "./styles.scss";

const Sidebar = () => {
	return (
		<aside className="sidebar">
			<NavLink className="sidebar__logo" to="/">
				<img src="/icon.svg" width={36} alt="" />
				<span>flovas (admin)</span>
			</NavLink>
			<nav className="sidebar-nav">
				<NavLink
					className={({ isActive }) =>
						`sidebar-nav__link ${isActive ? "sidebar-nav__link--active" : ""}`
					}
					to={"/"}
				>
					Головна
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						`sidebar-nav__link ${isActive ? "sidebar-nav__link--active" : ""}`
					}
					to={"/vacancies"}
				>
					Вакансії
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						`sidebar-nav__link ${isActive ? "sidebar-nav__link--active" : ""}`
					}
					to={"/leads"}
				>
					Ліди
				</NavLink>
			</nav>
		</aside>
	);
};

export default Sidebar;
