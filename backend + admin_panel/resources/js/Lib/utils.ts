import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currencyFormat = (number: number) => {
    return new Intl.NumberFormat("fr", {
        style: "currency",
        currency: "dzd",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);
};