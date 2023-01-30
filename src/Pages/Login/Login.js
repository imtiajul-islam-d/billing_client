import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";

const Login = () => {
  const { setFetch } = useContext(AUTH_CONTEXT);
  const handleLogin = (e) => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = {email, password};
    // login(email, password)
    fetch("https://billing-server-mu.vercel.app/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          localStorage.setItem("billing_user", data.data[0].email);
          setFetch(true);
          toast.success("Login successful")
        }
      });
  };
  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="bg-gray-200 px-5 py-3">
      <form onSubmit={handleLogin} >
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
          value="Login"
        />
      </form>
      <Link className="text-blue-700 mt-2" to="/registration">New here? Please register</Link>
      </div>
    </div>
  );
};

export default Login;
