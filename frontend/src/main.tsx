import React from "react";

import ReactDOM from "react-dom/client";

import {
  RouterProvider
} from "react-router";

import { router }
from "./app/routes";

import "./styles/index.css";

import {
  Toaster
} from "react-hot-toast";

import {
  ThemeProvider
} from "./context/ThemeContext";

ReactDOM.createRoot(

  document.getElementById("root")!

).render(

  <React.StrictMode>

    <ThemeProvider>

      <RouterProvider
        router={router}
      />

      <Toaster
        position="top-right"
      />

    </ThemeProvider>

  </React.StrictMode>
);