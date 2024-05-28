import React from "react";
import { Product } from "@/services/product";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { currencyFormat } from "@/lib/utils";

const Card = ({ slug, name, price, images, sizes }: Product) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center">
        <img className="p-4 h-52 w-auto rounded-t-lg" src={images[0]} alt="product image" />
      </div>
      <div className="px-5 pb-5 space-y-4 ">
        <Link to="/products/$slug" params={{ slug }}>
          <h5 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">{currencyFormat(price)}</span>
          <Button variant="secondary" asChild>
            <Link to="/products/$slug" params={{ slug }}>
              Voir
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export { Card };
