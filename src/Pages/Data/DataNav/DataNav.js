import React, { useContext } from "react";
import { AUTH_CONTEXT } from "../../../context/AuthProvider";

const DataNav = ({ setOpenModal, openModal }) => {
  const { user, logout } = useContext(AUTH_CONTEXT);

  return (
    <div className="container mx-auto bg-gray-100">
      <div className="navbar flex items-center justify-between px-2 bg-gray-100">
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
        <button className="bg-white px-3 py-2 rounded-md">
          {" "}
          <label
            onClick={() => setOpenModal(!openModal)}
            htmlFor="my-modal-3"
            className="btn"
          >
            Add bill
          </label>
        </button>
      </div>
    </div>
  );
};

export default DataNav;
