import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, adminOnly }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If no token is found, redirect to the login page
  console.log("Role from localStorage:", role);
  if (!token) {
    return <Navigate to="/" replace />;
  }
  if (adminOnly && role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }


  // If the token is present, allow access to the children
  return children;
}

export default PrivateRoute;