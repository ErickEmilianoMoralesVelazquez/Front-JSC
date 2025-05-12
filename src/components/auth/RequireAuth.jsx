import { Navigate } from "react-router-dom";
import React from "react";

export default function RequireAuth({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
