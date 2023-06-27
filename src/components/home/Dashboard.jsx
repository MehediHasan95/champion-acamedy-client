import { NavLink } from "react-router-dom";
import useRole from "../../hooks/useRole";

function Dashboard() {
  const [role, isLoading] = useRole();
  console.log(role, isLoading);

  const active =
    "w-full text-left px-3 text-royalPurple font-bold mb-3 lg:mb-0";
  const inActive = "w-full text-left px-3 mb-3 lg:mb-0 hover:text-royalPurple";

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content absolute left-0">
          <h1>Local host</h1>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="p-4 w-80 h-full bg-base-300 text-base-content">
            <li>
              <NavLink to="/dashboard">
                {({ isActive }) => (
                  <button className={isActive ? active : inActive}>
                    Dashboard
                  </button>
                )}
              </NavLink>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
