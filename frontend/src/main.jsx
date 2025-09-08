import React from "react";
import { createRoot } from "react-dom/client";

// Import Bootstrap CSS first
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Import your own CSS after Bootstrap
import "./index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
