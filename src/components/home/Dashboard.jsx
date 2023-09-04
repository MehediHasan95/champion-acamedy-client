import { NavLink, Outlet, useLocation } from "react-router-dom";
import useRole from "../../hooks/useRole";
import useTitle from "../../hooks/useTitle";

function Dashboard() {
  useTitle("Dashboard");
  const [role, isLoading, user] = useRole();
  const active = "px-3 py-1 bg-royalPurple text-white";
  const inActive = "px-3 py-1 border border-base-300";
  const location = useLocation();

  return (
    <div className="my-20">
      <div className="min-h-screen max-w-screen-2xl mx-auto">
        <div>
          <ul className="flex justify-start my-5">
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
                  <NavLink to="payment-history">
                    {({ isActive }) => (
                      <button className={isActive ? active : inActive}>
                        Payment History
                      </button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="enroll-class">
                    {({ isActive }) => (
                      <button className={isActive ? active : inActive}>
                        My Enroll Classes
                      </button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="student-profile">
                    {({ isActive }) => (
                      <button className={isActive ? active : inActive}>
                        My Profile
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
          {location.pathname === "/dashboard" && (
            <div className="min-h-[85vh] grid place-items-center">
              <div>
                <p className="text-base lg:text-2xl">
                  {!isLoading && role.role === "student"
                    ? "Student Dashboard"
                    : "Instructor Dashboard"}
                </p>
                <h1 className="text-2xl lg:text-5xl font-bold">
                  Welcome back!{" "}
                  <span className="text-royalPurple underline">
                    {user?.displayName}
                  </span>
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
