import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRouter({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  } else if (user) {
    return children;
  } else {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
}

export default PrivateRouter;
