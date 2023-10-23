import React from "react";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Site from "./pages/Site/Site";

function Protected({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (token !== token) {
    return <Navigate to="/login" replace />;
  } else if (token === null) {
    return (
      <Routes>
        <Route path="/" index element={<Site />}></Route>
      </Routes>
    );
  }

  if (!allowedRoles.includes(userRole)) {
    return <div>Unauthorized Access</div>;
  }
  return children;
}

export default Protected;
