import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import PageNotFound from "../components/utilities/PageNotFound";
import Home from "../components/home/Home";
import Authentication from "../components/auth/Authentication";
import AdminDashboard from "../components/admin/AdminDashboard";
import UserList from "../components/admin/UserList";

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
        path: "auth",
        element: <Authentication />,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
    children: [
      {
        path: "user-list",
        element: <UserList />,
      },
    ],
  },
]);

export default router;
