import { faHome, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import logo from "../../assets/logo.png";

function AdminDashboard() {
  const { user } = useContext(AuthContext);

  const active = "w-full p-1 mb-2 text-left text-royalPurple font-bold";
  const inActive = "w-full p-1 mb-2 text-left";
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="p-1 flex items-center">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-square btn-ghost lg:hidden"
            >
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
            <div className="w-full flex justify-between items-center p-2 lg:p-5">
              <h1>
                Welcome back! <br />
                <small>{user && user?.displayName}, Good morning</small>
              </h1>
              <div className="flex items-center space-x-4">
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={user && user?.photoURL} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="p-4 w-80 h-full bg-base-200 text-base-content">
            <div className="flex justify-center py-5">
              <img src={logo} alt="logo" className="w-8 h-8" />
              <span className="font-lobster text-2xl text-royalPurple">
                Champion<span className="text-platinum">Academy</span>
              </span>
            </div>

            <li>
              <NavLink to="user-list">
                {({ isActive }) => (
                  <button className={isActive ? active : inActive}>
                    <FontAwesomeIcon icon={faUsers} className="px-3" />
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
