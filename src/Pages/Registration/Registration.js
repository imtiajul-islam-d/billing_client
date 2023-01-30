import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";

const Registration = () => {
  const {setFetch} = useContext(AUTH_CONTEXT)
  const navigate = useNavigate()
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const user = {name, email, password};
    // login(email, password)
    fetch("https://billing-server-mu.vercel.app/api/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data.acknowledged) {
          toast.success("Successfully registered! Please login")
          navigate("/login");
        }
      });
  };
  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="bg-gray-200 px-5 py-3">
        <form onSubmit={handleRegister}>
          <label htmlFor="">Name</label>
          <br />
          <input
            required
            type="text"
            name="name"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          <br />
          <label htmlFor="">Email</label>
          <br />
          <input
            required
            type="email"
            name="email"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          <br />
          <label htmlFor="">Password</label>
          <br />
          <input
            required
            type="password"
            name="password"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          <br />
          <input
            className="mt-3 px-3 py-2 bg-white"
            type="submit"
            value="Register"
          />
        </form>
        <Link className="text-blue-700 mt-2" to="/login">
          Already have an account? Please login
        </Link>
      </div>
    </div>
  );
};

export default Registration;
