import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./v1/theme/rw-theme.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
