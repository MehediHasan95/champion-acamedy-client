import { Navigate, useLocation } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

function PrivateRouter({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [role, isLoading] = useRole();

  if (loading && isLoading) {
    return (
      <div className="min-h-[80vh] grid place-items-center">
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
  } else if (user && role?.role !== "admin") {
    return children;
  } else {
    return role?.role === "admin" ? (
      <Navigate to="/" state={{ from: location }} replace />
    ) : (
      <Navigate to="/auth" state={{ from: location }} replace />
    );
  }
}

export default PrivateRouter;
