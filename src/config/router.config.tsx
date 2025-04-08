import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/auth.context";

export const RouterConfig = () => {
  return (
    <>
      <AuthProvider>
        <ToastContainer theme="colored" />

        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};
