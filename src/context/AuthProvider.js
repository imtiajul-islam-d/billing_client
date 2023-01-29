import React, { createContext, useEffect, useState } from "react";

export const AUTH_CONTEXT = createContext();

const AuthProvider = ({ children }) => {
  const [loadingState, setLoadingState] = useState(true);
  const [user, setUser] = useState(null);

  // user login

  // get currently signed in user
  useEffect(() => {
    const user = localStorage.getItem("billing_user");
    setUser(user);
    setLoadingState(false);
  }, []);
  const authInfo = {
    user,
    loadingState,
    setLoadingState,
  };
  return (
    <AUTH_CONTEXT.Provider value={authInfo}>{children}</AUTH_CONTEXT.Provider>
  );
};

export default AuthProvider;
