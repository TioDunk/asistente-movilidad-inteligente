import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { RutaOptima } from "./pages/RutaOptima";
import { SiniestralidadLive } from "./pages/SiniestralidadLive";
import { ReportarSiniestro } from "./pages/ReportarSiniestro";

const router = createBrowserRouter([
  { path: "/", element: <RutaOptima /> },
  { path: "/siniestralidad-en-vivo", element: <SiniestralidadLive /> },
  { path: "/reportar", element: <ReportarSiniestro /> },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
