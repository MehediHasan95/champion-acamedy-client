import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemesProvider from "./context/ThemesProvider.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemesProvider>
      <App />
    </ThemesProvider>
  </React.StrictMode>
);
