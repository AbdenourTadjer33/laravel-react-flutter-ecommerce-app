import { Product } from "@/services/product";
import { Link } from "@tanstack/react-router";
import React from "react";
import { Button } from "../ui/button";
import { CartContext } from "@/contexts/cartContext";

const Card = ({ slug, name, price, images }: Product) => {
  const { add, items } = React.useContext(CartContext);

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center">
        <img
          className="p-4 h-52 w-auto rounded-t-lg"
          src={images[0]}
          alt="product image"
        />
      </div>
      <div className="px-5 pb-5 space-y-4 sm:space-y-6">
        <Link to="/products/$slug" params={{ slug: slug }}>
          <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">{price} DA</span>
          <Button
            variant="ghost"
            onClick={() =>
              add({
                slug,
                qte: 1,
              })
            }
          >
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  );
};
export { Card };
