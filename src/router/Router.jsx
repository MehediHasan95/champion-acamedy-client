import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import PageNotFound from "../components/utilities/PageNotFound";
import Home from "../components/home/Home";
import Authentication from "../components/auth/Authentication";

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
]);

export default router;
