import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { FiShoppingBag } from "react-icons/fi";
import { Heading } from "./ui/heading";
import { CartContext } from "@/contexts/cartContext";
import { useQuery } from "@tanstack/react-query";
import { getCart, Product } from "@/services/product";
import { Link } from "@tanstack/react-router";
import { Minus } from "lucide-react";

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
                        <CartItems />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};

const CartItems = () => {
    const { items } = React.useContext(CartContext);
    const [products, setProducts] = React.useState([]);

    const { data } = useQuery({ queryKey: ["cart"], queryFn: async () => getCart(items) });

    React.useEffect(() => {
        if (!data) return;
        setProducts(data);
    }, [data]);

    return (
        <>
            <Heading level={4} className="font-medium">
                Mon panier
            </Heading>

            <div>
                {products.map((product, idx) =>
                    <CartItem key={idx} product={product} />
                )}
            </div>

            <footer></footer>
        </>
    );
};

const CartItem = ({ product }: { product: Product }) => {
    return (
        <div className="relative transition duration-200 hover:bg-gray-100 p-3 flex w-full">
            <div className="h-20 sm:h-24 object-contain overflow-hidden rounded ">
                <img
                    // src={media(item?.product?.images?.[0] ?? "default.png")}
                    className="w-20 object-cover"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div className="space-y-3">
                    <div className="flex flex-col text-base font-medium text-gray-900">
                        <Link
                        >
                            <h3 className="text-base font-medium pe-5">
                                {product.name}
                            </h3>
                        </Link>
                    </div>
                    <hr />
                    <div className="mt-1 text-sm text-gray-500 relative">
                        <p className="text-base text-gray-500 font-medium">
                            {product.price}
                        </p>
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-between text-sm mt-3">
                    <div className="flex items-center">
                        <button
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                        >
                            <Minus />
                        </button>
                        <div>
                            <input
                                type="text"
                                className="bg-gray-50 w-10 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                readOnly
                            />
                        </div>
                        <button
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                        >
                            {/* <Plus /> */}
                        </button>
                    </div>
                    <div className="text-sm sm:text-lg">
                        Total:{" "}
                        <span className="font-medium">
                            {"1000 DA"}
                        </span>
                    </div>
                    <button
                        type="button"
                        className="absolute top-3 right-2 font-medium text-info-600 hover:text-info-500"
                    >
                        {/* <FaRegTrashCan className="w-4 h-4" /> */}
                    </button>
                </div>
            </div>
        </div>
    )
};

export { Cart };
