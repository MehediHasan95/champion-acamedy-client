import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemesProvider from "./context/ThemesProvider.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AuthProvider from "./context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemesProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <App />
          </SnackbarProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ThemesProvider>
  </React.StrictMode>
);
