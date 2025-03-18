import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children , isLoading }) {
  const location = useLocation();

  console.log("CheckAuth Debug:", { isAuthenticated, user, location  , isLoading});

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }


  if (isAuthenticated && (location.pathname.includes("/auth/login") || location.pathname.includes("/auth/register"))) {
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (user?.role === "user") return <Navigate to="/user" replace />;
    if (user?.role === "provider") return <Navigate to="/service-provider" replace />;
  }

 
  if (user?.role === "admin" && location.pathname.startsWith("/user")) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (user?.role === "provider" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/service-provider" replace />;
  }
  if (user?.role === "user" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/user" replace />;
  }

  return <>{children}</>;
}

export default CheckAuth;
