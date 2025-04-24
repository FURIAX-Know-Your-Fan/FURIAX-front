import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { AuthProvider } from "./context/auth/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <AuthProvider>
          <main className="dark text-foreground bg-background h-screen">
            <ToastProvider />
            <App />
          </main>
        </AuthProvider>
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>
);
