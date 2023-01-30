import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const AUTH_CONTEXT = createContext();

const AuthProvider = ({ children }) => {
  const [loadingState, setLoadingState] = useState(true);
  const [fetch, setFetch] = useState(false);
  const [user, setUser] = useState(null);

  // logout
  const logout = () => {
    localStorage.removeItem("billing_user");
    toast.success("Logged out!!");
    setFetch(true);
  };
  // get currently signed in user
  useEffect(() => {
    const user = localStorage.getItem("billing_user");
    setUser(user);
    setLoadingState(false);
    setFetch(false);
  }, [fetch]);
  const authInfo = {
    user,
    loadingState,
    setLoadingState,
    logout,
    setFetch,
    fetch
  };
  return (
    <AUTH_CONTEXT.Provider value={authInfo}>{children}</AUTH_CONTEXT.Provider>
  );
};

export default AuthProvider;
