import React from "react";
import { useCart, Item, UseCartProps } from "@/hooks/useCart";

export interface CartContextProps extends UseCartProps {
  cartState: boolean;
  setCartState: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = React.createContext<CartContextProps>({
  items: [],
  add: (item: Item) => {},
  remove: (idx: keyof Item[]) => {},
  update: (idx: keyof Item[], cart: (item: Item) => Item) => {},
  addItems: (items: Item[]) => {},
  cartState: false,
  setCartState: () => {},
  removeAll: () => {},
});

const CartContextProvider = ({ children }) => {
  const { items, add, remove, update, addItems, removeAll } = useCart();
  const [cartState, setCartState] = React.useState(false);

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        update,
        addItems,
        cartState,
        setCartState,
        removeAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
