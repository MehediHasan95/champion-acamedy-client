import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useContext } from "react";
import { ThemesContext } from "../../context/ThemesProvider";
import { AuthContext } from "../../context/AuthProvider";

function Navbar() {
  const { themes, setThemes } = useContext(ThemesContext);
  const { user, loading, logOut } = useContext(AuthContext);

  const active =
    "w-full text-left px-3 text-royalPurple font-bold mb-3 lg:mb-0";
  const inActive = "w-full text-left px-3 mb-3 lg:mb-0 hover:text-royalPurple";

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/">
          {({ isActive }) => (
            <button className={isActive ? active : inActive}>Home</button>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/classes">
          {({ isActive }) => (
            <button className={isActive ? active : inActive}>Classes</button>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/admin-dashboard">
          {({ isActive }) => (
            <button className={isActive ? active : inActive}>Dashboard</button>
          )}
        </NavLink>
      </li>

      <li>
        {user ? (
          <button onClick={handleLogOut} className="px-3">
            Logout
          </button>
        ) : (
          <NavLink to="/auth">
            {({ isActive }) => (
              <button className={isActive ? active : inActive}>Login</button>
            )}
          </NavLink>
        )}
      </li>
      <li>
        <button
          onClick={() => setThemes(!themes)}
          className="px-3 tooltip tooltip-bottom"
          data-tip={themes ? "Dark Mode" : "Light Mode"}
        >
          <FontAwesomeIcon icon={themes ? faSun : faMoon} className="text-xl" />
        </button>
      </li>

      {user && (
        <li>
          <div
            className="avatar px-0 lg:px-3 tooltip tooltip-left hidden lg:block"
            data-tip={!loading && user?.displayName}
          >
            <div className="w-8 rounded-full">
              <img src={!loading && user?.photoURL} alt="profile" />
            </div>
          </div>
        </li>
      )}
    </>
  );

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-100">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
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
          </div>
          <div className="flex-1 justify-between px-2">
            <Link to="/">
              <div className="flex">
                <img src={logo} alt="logo" className="w-8 h-8" />
                <span className="font-lobster text-2xl text-royalPurple">
                  Champion<span className="text-platinum">Academy</span>
                </span>
              </div>
            </Link>
            {user && (
              <div className="avatar block lg:hidden">
                <div className="w-8 rounded-full">
                  <img src={!loading && user?.photoURL} alt="profile" />
                </div>
              </div>
            )}
          </div>
          <div className="flex-none hidden lg:block px-5">
            <ul className="flex items-center">{navItems}</ul>
          </div>
        </div>
      </div>
      <div className="drawer-side z-10">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="p-4 w-80 h-full bg-base-200">{navItems}</ul>
      </div>
    </div>
  );
}

export default Navbar;
