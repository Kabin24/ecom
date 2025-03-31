import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";
export const RouterConfig = () => {
  return (
    <>
      <ToastContainer theme="colored" />
      <RouterProvider router={router} />
    </>
  );
};
