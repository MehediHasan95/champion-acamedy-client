import {
  faAddressCard,
  faChalkboardUser,
  faContactBook,
  faHome,
  faHomeAlt,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

function AdminDashboard() {
  const { user } = useAuth();
  useTitle("Dashboard");

  const active = "w-full p-1 mb-2 text-left font-bold";
  const inActive = "w-full p-1 mb-2 text-left font-thin";

  function greetByTime() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let greeting;
    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good night";
    }
    return greeting;
  }

  const greeting = greetByTime();

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="flex items-center bg-gray-300 bg-opacity-30">
            <label htmlFor="my-drawer-2" className="btn btn-square lg:hidden">
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
            <div className="w-full flex justify-between items-center py-2 px-4">
              <h1>
                <span className="text-2xl font-bold">Welcome back!</span> <br />
                <small>
                  {user && user?.displayName}, {greeting}
                </small>
              </h1>
              <div className="flex items-center space-x-8">
                <Link
                  to="/"
                  className="tooltip tooltip-left"
                  data-tip="Back to Home"
                >
                  <FontAwesomeIcon icon={faHomeAlt} />
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
          <ul className="p-4 w-80 h-full bg-royalPurple dark:bg-base-300 text-base-100 dark:text-base-content">
            <div className="flex justify-center py-5">
              <img src={logo} alt="logo" className="w-8 h-8" />
              <span className="font-lobster text-2xl text-base-100 dark:text-royalPurple">
                Champion<span className="text-platinum">Academy</span>
              </span>
            </div>

            <li>
              <NavLink to="admin-profile">
                {({ isActive }) => (
                  <button className={isActive ? active : inActive}>
                    <FontAwesomeIcon icon={faAddressCard} className="px-3" />
                    My Profile
                  </button>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="manage-users">
                {({ isActive }) => (
                  <button className={isActive ? active : inActive}>
                    <FontAwesomeIcon icon={faUsers} className="px-3" />
                    Manage Users
                  </button>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="manage-classes">
                {({ isActive }) => (
                  <button className={isActive ? active : inActive}>
                    <FontAwesomeIcon icon={faChalkboardUser} className="px-3" />
                    Manage Classes
                  </button>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="manage-contact">
                {({ isActive }) => (
                  <button className={isActive ? active : inActive}>
                    <FontAwesomeIcon icon={faContactBook} className="px-3" />
                    Manage Contact
                  </button>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                {({ isActive }) => (
                  <button className={isActive ? active : inActive}>
                    <FontAwesomeIcon icon={faHome} className="px-3" />
                    Home Page
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
