import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext";
import { MenuProvider } from "./context/menuContext";
import { OrderProvider } from "./context/orderContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MenuProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </MenuProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
