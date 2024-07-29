import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appRouter from "./config/routes";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "sonner";

const routes = createBrowserRouter(appRouter());
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
      <Toaster position="top-right" richColors closeButton />
    </Provider>
  </React.StrictMode>
);
