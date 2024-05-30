import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { FiShoppingBag } from "react-icons/fi";
import { CartContext } from "@/contexts/cartContext";
import { useQuery } from "@tanstack/react-query";
import { getCart, Product } from "@/services/product";
import { Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { currencyFormat } from "@/lib/utils";

const Cart = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <FiShoppingBag className="w-7 h-7 text-blue-800" />
          </Button>
        </SheetTrigger>
        <SheetContent className="p-0 flex h-full flex-col">
          <CartItems setOpen={setOpen} />
        </SheetContent>
      </Sheet>
    </>
  );
};

const CartItems = ({ setOpen }) => {
  const { items, addItems } = React.useContext(CartContext);
  const { data: products } = useQuery({ queryKey: ["cart"], queryFn: async () => getCart(items) });

  React.useEffect(() => {
    if (!products) return;
    const newCartItems = products.map((product) => {
      return { slug: product.slug, qte: product.qte, size: product.size };
    });

    if (newCartItems.length) {
      addItems(newCartItems);
    }
  }, [products]);

  return (
    <>
      <div className="flex-1 overflow-y-auto mt-5 py-6">
        {!products || !products.length ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ">
            <img />
            Votre panier est vide
          </div>
        ) : (
          <>
            {products.map((product, idx) => (
              <CartItem key={idx} idx={idx} product={product} />
            ))}
            
            <div className="border-t border-gray-200 px-4 py-6 ">
              <div className="mt-4">
                <Button variant="secondary" className="w-full">
                  Continue
                </Button>
              </div>
              <div className="flex justify-center text-center text-sm text-gray-500">
                <p>
                  ou
                  <Button variant="link" onClick={() => setOpen(false)}>
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Button>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const CartItem = ({ product, idx }: { product: Product; idx: number }) => {
  const { items, update } = React.useContext(CartContext);
  const [qte, setQte] = React.useState(items[idx].qte);

  const handleQteChange = (newQte: number) => {
    if (newQte <= 5 && newQte > 0) {
      setQte(newQte);
      update(idx, (product) => {
        product.qte = newQte;
        return product;
      });
    }
  };

  return (
    <div className="relative transition duration-200 hover:bg-gray-100 p-3 flex w-full">
      <div className="h-20 sm:h-24 object-contain overflow-hidden rounded ">
        <img src={product?.images?.[0]} className="w-20 object-cover" />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="space-y-3">
          <div className="flex flex-col text-base font-medium text-gray-900">
            <Link>
              <h3 className="text-base font-medium pe-5">{product.name}</h3>
            </Link>
          </div>
          <hr />
          <div className="mt-1 text-sm text-gray-500 relative">
            <p className="text-base text-gray-500 font-medium">{product.price}</p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between text-sm mt-3">
          <div className="flex items-center">
            <button
              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => {
                handleQteChange(qte - 1);
              }}
            >
              <Minus />
            </button>
            <div>
              <input
                type="text"
                className="bg-gray-50 w-10 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                readOnly
                value={qte}
              />
            </div>
            <button
              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => {
                handleQteChange(qte + 1);
              }}
            >
              <Plus />
            </button>
          </div>
          <div className="text-sm sm:text-lg">
            Total: <span className="font-medium">{Number(product.price) * qte}</span>
          </div>
          <button
            type="button"
            className="absolute top-3 right-2 font-medium text-info-600 hover:text-info-500"
          ></button>
        </div>
      </div>
    </div>
  );
};

export { Cart };
