import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet } from "react-router-dom";

function AdminDashboard() {
  const active = "w-full p-1 mb-2 text-left text-royalPurple font-bold";
  const inActive = "w-full p-1 mb-2 text-left";
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="p-1 flex items-center lg:hidden">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <p className="px-3">Admin Dashboard</p>
          </div>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="p-4 w-80 h-full bg-base-200 text-base-content">
            <li>
              <NavLink to="user-list">
                {({ isActive }) => (
                  <button className={isActive ? active : inActive}>
                    <FontAwesomeIcon icon={faUsers} className="px-5" />
                    User List
                  </button>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="use">
                {({ isActive }) => (
                  <button className={isActive ? active : inActive}>
                    User List
                  </button>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
