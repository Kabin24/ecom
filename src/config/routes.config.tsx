import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { Spin } from "antd";
const LoginPage = lazy(() => import("../pages/login/login.page.tsx"));
const ForgetPassword = lazy(
  () => import("../pages/auth/forget-password/forget-password.page.tsx")
);
const Register = lazy(() => import("../pages/auth/register/register.page.tsx"));
const ComingSoon = lazy(
  () => import("../components/coming-soon/coming-soon.component.tsx")
);
const NotFound = lazy(
  () => import("../components/errors/not-found.component.tsx")
);
const AdminLayout = lazy(() => import("../pages/layout/admin-layout.tsx"));
const ActivatePage = lazy(
  () => import("../pages/auth/activate/activate.page.tsx")
);
const ResetPassword = lazy(
  () => import("../pages/auth/forget-password/reset-password.page.tsx")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spin fullscreen></Spin>}>
        <LoginPage></LoginPage>
      </Suspense>
    ),
  },
  {
    path: "/activate/:activationtoken",
    Component: ActivatePage,
  },
  {
    path: "/verify-forget-token/:forgetToken",
    element: (
      <Suspense fallback={<Spin fullscreen></Spin>}>
        <ResetPassword></ResetPassword>
      </Suspense>
    ),
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
