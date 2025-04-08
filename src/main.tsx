import React from "react";

import { RouterConfig } from "./config/router.config";
import "./assets/css/main.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./config/store";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterConfig />
    </Provider>
  </React.StrictMode>
);
