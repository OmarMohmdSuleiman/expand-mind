import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // If no token is found, redirect to the login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If the token is present, allow access to the children
  return children;
}

export default PrivateRoute;