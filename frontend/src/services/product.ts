import { Item } from "@/hooks/useCart";
import axios from "axios";

export type Product = {
    slug: string;
    name: string;
    description?: string;
    price: string;
    images: string[];
    brand?: string;
    sizes: string[];
};

export interface CartProduct extends Product {
    qte: number;
    size: string | number | undefined;
}

async function getProducts(): Promise<Product[]> {
    const response = await axios.get(route("api.product.index"));
    return await response.data;
}

async function getProduct(slug: string): Promise<Product> {
    const response = await axios.get(route("api.product.show", slug));
    return await response.data;
}

async function getCart(items: Item[]): Promise<CartProduct[]> {
    const response = await axios.post(route('api.cart'), { cart: items });
    return await response.data;
}

export { getProducts, getProduct, getCart };
