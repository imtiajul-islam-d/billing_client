import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Nav from "../Pages/Shared/Navigation/Nav";

const Main = () => {
  return (
    <section>
      <Nav></Nav>
      <Outlet></Outlet>
      <Footer></Footer>
    </section>
  );
};

export default Main;
