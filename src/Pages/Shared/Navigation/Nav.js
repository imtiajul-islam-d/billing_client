import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AUTH_CONTEXT } from "../../../context/AuthProvider";

const Nav = ({amount}) => {
  const { user, setFetch, logout } = useContext(AUTH_CONTEXT);
  const navigate = useNavigate();
  // fetch amount
 

  // fetch amount
  const signin = (email, password) => {
    const user = { email, password };
    // login(email, password)
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data[0]);
        if (data.status === "success") {
          localStorage.setItem("billing_user", data.data[0].email);
          setFetch(true);
          if (user) {
            navigate("/");
          }
        }
      });
  };
  // logout
  const signout = () => {
    logout();
  };
  return (
    <div className="border-b-2 border-gray-200">
      <div className="container mx-auto px-5 ">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost normal-case text-xl">
              Power-Hack
            </Link>
          </div>
          <div className="flex-none mr-3">Paid total = ${amount}</div>
          <div>
            {user ? (
              <button
                className="border-gray-200 border-2 px-3 py-2 rounded-md"
                onClick={signout}
              >
                Logout
              </button>
            ) : (
              <button
                className="ml-3"
                onClick={() => signin("imtiajul@gmail.com", 123)}
              >
                login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
