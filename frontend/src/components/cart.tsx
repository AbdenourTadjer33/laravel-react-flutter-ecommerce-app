import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { FiShoppingBag } from "react-icons/fi";
import { Heading } from "./ui/heading";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Cart = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <FiShoppingBag className="w-7 h-7" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Panier</SheetTitle>
          </SheetHeader>

          <div className="h-screen py-4 space-y-2 sm:space-y-4">
            <CartBar />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

const CartBar = () => {
  const [local, setLocal] = useLocalStorage("cart", []);
  
  return (
    <>
      <Heading level={4} className="font-medium">
        Mon panier
      </Heading>

      <div></div>
    </>
  );
};

export { Cart };

const cartItems = [
  {
    slug: "",
  },
];
