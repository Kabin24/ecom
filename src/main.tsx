import React from "react";

import { RouterConfig } from "./config/router.config";
import "./assets/css/main.css";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterConfig />
  </React.StrictMode>
);
