import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";

const PrivetRoute = ({ children }) => {
  const { user, loadingState } = useContext(AUTH_CONTEXT);
  const location = useLocation();
  if (loadingState) {
    return <div>loading</div>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivetRoute;
