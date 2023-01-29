import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Nav from "../Pages/Shared/Navigation/Nav";

const Main = () => {
  return (
    <section>
      <Nav></Nav>
      <section className="min-h-[90vh]">
        <Outlet></Outlet>
      </section>
      <Footer></Footer>
    </section>
  );
};

export default Main;
