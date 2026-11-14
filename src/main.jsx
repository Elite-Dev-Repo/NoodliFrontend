import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Applications from "./Applications.jsx";
import Analytics from "./Analytics.jsx";
import Dashboard from "./Dashboard.jsx";
import Docs from "./Docs.jsx";
import Goals from "./Goals.jsx";
import Reports from "./Reports.jsx";
import Settings from "./Settings.jsx";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/applications",
    element: <Applications />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/goals",
    element: <Goals />,
  },
  {
    path: "/docs",
    element: <Docs />,
  },
  {
    path: "/analytics",
    element: <Analytics />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:uidb64/:token",
    element: <ResetPassword />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
);
