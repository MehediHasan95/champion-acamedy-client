import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import PageNotFound from "../components/utilities/PageNotFound";
import Home from "../components/home/Home";
import Authentication from "../components/auth/Authentication";
import AdminDashboard from "../components/admin/AdminDashboard";
import ManageUsers from "../components/admin/ManageUsers";
import ManageClasses from "../components/admin/ManageClasses";
import Dashboard from "../components/home/Dashboard";
import PrivateRouter from "./PrivateRouter";
import PrivateAdminRouter from "./PrivateAdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        ),
        children: [{}],
      },
      {
        path: "auth",
        element: <Authentication />,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <PrivateAdminRouter>
        <AdminDashboard />
      </PrivateAdminRouter>
    ),
    children: [
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-classes",
        element: <ManageClasses />,
      },
    ],
  },
]);

export default router;
