import { Product } from "@/services/product";
import { Link } from "@tanstack/react-router";
import React from "react";

const Card = ({ slug, name, price }: Product) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="p-8 rounded-t-lg"
          src="https://flowbite.com/docs/images/products/apple-watch.png"
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5">
        <Link to="/products/$slug" params={{ slug: slug }}>
          <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">{price} DA</span>
          <a
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ajouter au panier
          </a>
        </div>
      </div>
    </div>
  );
};
export { Card };
