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
import AddClass from "../components/instructor/AddClass";
import MyClass from "../components/instructor/MyClass";
import InstructorProfile from "../components/instructor/InstructorProfile";
import Classes from "../components/home/Classes";
import MySelectedClass from "../components/student/MySelectedClass";
import Payment from "../components/student/Payment";
import PaymentHistory from "../components/student/PaymentHistory";
import MyEnrollClasses from "../components/student/MyEnrollClasses";
import AllInstructor from "../components/home/AllInstructor";
import StudentProfile from "../components/student/StudentProfile";
import AdminProfile from "../components/admin/AdminProfile";

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
        path: "classes",
        element: <Classes />,
      },
      {
        path: "instructor",
        element: <AllInstructor />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        ),
        children: [
          {
            path: "student-profile",
            element: <StudentProfile />,
          },
          {
            path: "addclass",
            element: <AddClass />,
          },
          {
            path: "myclass",
            element: <MyClass />,
          },
          {
            path: "instructor-profile",
            element: <InstructorProfile />,
          },
          {
            path: "myselectedclass",
            element: <MySelectedClass />,
          },
          {
            path: "myselectedclass/payment",
            element: <Payment />,
          },
          {
            path: "payment-history",
            element: <PaymentHistory />,
          },
          {
            path: "enroll-class",
            element: <MyEnrollClasses />,
          },
        ],
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
        path: "admin-profile",
        element: <AdminProfile />,
      },
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
