import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";

function Dashboard() {
  const [role, isLoading] = useRole();

  const active = "px-3 py-1 bg-royalPurple text-white uppercase";
  const inActive = "px-3 py-1 uppercase";

  return (
    <div className="min-h-75 max-w-screen-2xl mx-auto">
      <div className="py-10 text-center uppercase text-xl font-semibold bg-royalPurple text-white">
        <span className="">{!isLoading && role.role} Dashboard</span>
      </div>

      <div>
        <ul className="flex justify-center space-x-2 my-5">
          {!isLoading && role?.role === "student" ? (
            <>
              <li>
                <NavLink to="myselectedclass">
                  {({ isActive }) => (
                    <button className={isActive ? active : inActive}>
                      My Selected Class
                    </button>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="payment">
                  {({ isActive }) => (
                    <button className={isActive ? active : inActive}>
                      My Enroll Classes
                    </button>
                  )}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="addclass">
                  {({ isActive }) => (
                    <button className={isActive ? active : inActive}>
                      Add Class
                    </button>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="myclass">
                  {({ isActive }) => (
                    <button className={isActive ? active : inActive}>
                      My Class
                    </button>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="instructor-profile">
                  {({ isActive }) => (
                    <button className={isActive ? active : inActive}>
                      Profile
                    </button>
                  )}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <Outlet />
      </div>

      {/* <div className="grid place-items-center">
        <div className="tabs">
          {!isLoading && role?.role === "student" ? (
            <>
              <NavLink to="myselectedclass">
                {({ isActive }) => (
                  <button className={isActive ? active : inActive}>
                    My Selected Class
                  </button>
                )}
              </NavLink>
              <NavLink to="payment">
                {({ isActive }) => (
                  <button className={isActive ? active : inActive}>
                    Payment
                  </button>
                )}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="addclass">
                {({ isActive }) => (
                  <button className={isActive ? active : inActive}>
                    Add a Class
                  </button>
                )}
              </NavLink>
              <NavLink to="myclass">
                {({ isActive }) => (
                  <button className={isActive ? active : inActive}>
                    My Class
                  </button>
                )}
              </NavLink>
              <NavLink to="instructor-profile">
                {({ isActive }) => (
                  <button className={isActive ? active : inActive}>
                    Profile
                  </button>
                )}
              </NavLink>
            </>
          )}
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div> */}
    </div>
  );
}

export default Dashboard;
