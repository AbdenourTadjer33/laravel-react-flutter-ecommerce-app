import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Outlet } from "@tanstack/react-router";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
