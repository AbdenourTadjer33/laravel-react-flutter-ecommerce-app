import React from "react";
import { Link } from "@tanstack/react-router";
import { FiShoppingBag } from "react-icons/fi";
import { Button } from "./ui/button";
import { Cart } from "./cart";

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
        </Link>
        <Cart />
      </div>
    </nav>
  );
};

export default Navbar;
