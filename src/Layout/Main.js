import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AUTH_CONTEXT } from "../context/AuthProvider";
import Footer from "../Pages/Shared/Footer/Footer";
import Nav from "../Pages/Shared/Navigation/Nav";

const Main = () => {
  const { user } = useContext(AUTH_CONTEXT);

  return (
    <section>
      <section className="min-h-[90vh]">
        <Outlet></Outlet>
      </section>
      <Footer></Footer>
    </section>
  );
};

export default Main;
