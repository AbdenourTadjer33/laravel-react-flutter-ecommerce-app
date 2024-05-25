import React from "react";
import { useCart, Item, UseCartProps } from "@/hooks/useCart";

const CartContext = React.createContext<UseCartProps>({
  items: [],
  add: (item: Item) => {},
  remove: (idx: keyof Item[]) => {},
});

const CartContextProvider = ({ children }) => {
  const { items, add, remove } = useCart();

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
