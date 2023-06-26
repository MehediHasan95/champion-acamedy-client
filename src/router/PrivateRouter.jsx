import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function PrivateRouter({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div>
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
  } else if (user) {
    return children;
  } else {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
}

export default PrivateRouter;
