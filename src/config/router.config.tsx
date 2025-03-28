import { RouterProvider } from "react-router";
import { router } from "./routes.config";

export const RouterConfig = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
