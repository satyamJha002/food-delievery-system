import React from "react";
import Login from "./pages/Login";
import { Toaster } from "@/components/ui/toaster";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Order from "./pages/Order";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
