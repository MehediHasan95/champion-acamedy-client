import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";
import { Oval } from "react-loader-spinner";

function PrivateAdminRouter({ children }) {
  const location = useLocation();
  const [role, isLoading] = useRole();

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Oval
          height={50}
          width={50}
          color="#6951AE"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#d2cbe7"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      </div>
    );
  } else if (role?.role === "admin") {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
}

export default PrivateAdminRouter;
