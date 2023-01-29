import React, { useContext } from "react";
import { AUTH_CONTEXT } from "../../../context/AuthProvider";

const DataNav = () => {
  const { user, logout } = useContext(AUTH_CONTEXT);
  // signin
  const signin = () => {};

  const signout = () => {
    logout();
  };
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100 flex items-center justify-between px-2">
        <div className="hidden md:block">Billings</div>
        <div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div>
        </div>
        {user ? (
          <div onClick={signout}>Logout</div>
        ) : (
          <div onClick={signin}>Login</div>
        )}
      </div>
    </div>
  );
};

export default DataNav;
