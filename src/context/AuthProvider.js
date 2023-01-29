import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AUTH_CONTEXT = createContext();

const AuthProvider = ({ children }) => {
  const [loadingState, setLoadingState] = useState(true);
  const [fetch, setFetch] = useState(false);
  const [user, setUser] = useState(null);

  // register
  const register = (name, email, password) => {};
  // user login
  const login = (email, password) => {
    // send email and pass to endpoint
    const user = { email, password };
    console.log(user);
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
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
    login,
    setFetch,
    fetch
  };
  return (
    <AUTH_CONTEXT.Provider value={authInfo}>{children}</AUTH_CONTEXT.Provider>
  );
};

export default AuthProvider;
