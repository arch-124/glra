import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  if (user.role !== "admin") {
    alert("Access denied! Admins only 🚫");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
