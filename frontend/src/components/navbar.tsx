import React from "react";
import { Link } from "@tanstack/react-router";
import { Cart } from "./panier";
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-12" />
        </Link>
        <Cart />
      </div>
    </nav>
  );
};

export default Navbar;
