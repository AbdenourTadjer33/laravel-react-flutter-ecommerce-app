import React from "react";
import logo from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white  dark:bg-gray-900 ">
      <div className="w-full max-w-screen-xl mx-auto p-4">
        <div className="flex items-end justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} className=" h-12" />
          </Link>

          <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
            <a href="https://facebook.com" target="_blank" className="hover:underline me-4 md:me-6">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" className="hover:underline me-4 md:me-6">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://x.com" target="_blank" className="hover:underline">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
        <hr className="my-5 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
          © 2023 <span className="hover:underline">Shoesshop</span>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
