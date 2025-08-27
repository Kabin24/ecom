import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { Spin } from "antd";

const HomePage = lazy(() => import("../pages/home/home.page.tsx"));
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

const BannerEdit = lazy(() => import("../pages/brand/brand-edit.page.tsx"));
const BannerList = lazy(() => import("../pages/banner/banner-list.page.tsx"));
const BannerCreate = lazy(
  () => import("../pages/banner/banner-create.page.tsx")
);
const BrandEdit = lazy(() => import("../pages/brand/brand-edit.page.tsx"));
const BrandList = lazy(() => import("../pages/brand/brand-list.page.tsx"));
const BrandCreate = lazy(() => import("../pages/brand/brand-create.page.tsx"));

const ChatPage = lazy(() => import("../pages/chat/chat-detail.page.tsx"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/login",
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
        Component: BannerList,
      },
      {
        path: "banner/create",
        Component: BannerCreate,
      },
      {
        path: "banner/:id",
        Component: BannerEdit,
      },
      {
        path: "brand",
        Component: BrandList,
      },
      {
        path: "brand/create",
        Component: BrandCreate,
      },
      {
        path: "brand/:id",
        Component: BrandEdit,
      },
      {
        path: "chat",
        Component: ChatPage,
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
