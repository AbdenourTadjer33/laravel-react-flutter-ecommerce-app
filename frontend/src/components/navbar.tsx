import React from "react";
import { Link } from "@tanstack/react-router";
import { FiShoppingBag } from "react-icons/fi";
import { Button } from "./ui/button";
import { Cart } from "./cart";

const Navbar = () => {
  const links = [
    {
      href: "/",
      label: "Accueil",
    },
    {
      href: "/products",
      label: "Produits",
    },
  ];

  return (
    <nav className="bg-white border-gray-200 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
        </a>
        <ul className="font-medium flex gap-4">
          {links.map(({ label, href }, idx) => (
            <li key={idx}>
              <Link to={href} className="text-gray-900 hover:text-blue-600 data-[status=active]:text-blue-600 ">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Cart />
      </div>
    </nav>
  );
};

export default Navbar;
