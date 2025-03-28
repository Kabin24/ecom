import LoginPage from "../pages/login/login.page.tsx";
import { createBrowserRouter } from "react-router";

import { ForgetPassword } from "../pages/auth/forget-password/forget-password.page.tsx";
import { Register } from "../pages/auth/register/register.page.tsx";
import { ComingSoon } from "../components/coming-soon/coming-soon.component.tsx";
import NotFound from "../components/errors/not-found.component.tsx";
import AdminLayout from "../pages/layout/admin-layout.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "terms-and-conditions",
    Component: ComingSoon,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/forget-password",
    Component: ForgetPassword,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        index: true,
        Component: ComingSoon,
      },
      {
        path: "banner",
        Component: ComingSoon,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
