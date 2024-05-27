import axios from "axios";
import { Product } from "./product";

export type Brand = {
    id: string;
    name: string;
    logo: string;
    products?: Product[]
}

async function getBrands(): Promise<Brand[]> {
    const response = await axios.get(route('api.brand.index'));
    return await response.data;
}

async function getBrand(brand: string): Promise<Brand> {
    const response = await axios.get(route('api.brand.show', brand))
    return await response.data;
}



export {
    getBrands,
    getBrand,
};