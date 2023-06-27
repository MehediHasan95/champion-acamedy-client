import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";

function Dashboard() {
  const [role, isLoading] = useRole();
  console.log(role, isLoading);

  const active = "tab tab-bordered tab-active";
  const inActive = "tab tab-bordered";

  return (
    <div className="min-h-75">
      <div className="flex flex-col w-full">
        <div className="grid py-10 place-items-center uppercase text-xl font-semibold text-royalPurple">
          <span className="border-b-4 border-royalPurple px-2">
            {!isLoading && role.role} Dashboard
          </span>
        </div>

        <div className="grid place-items-center">
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
