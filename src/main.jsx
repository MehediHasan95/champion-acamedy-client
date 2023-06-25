import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemesProvider from "./context/ThemesProvider.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AuthProvider from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemesProvider>
  </React.StrictMode>
);
