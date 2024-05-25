import React, { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useToast } from "@/components/ui/use-toast";

export type Item = {
    slug: string;
    qte: number;
    size?: number;
};

export interface UseCartProps {
    items: Item[];
    add: (item: Item) => void;
    remove: (idx: keyof Item[]) => void;
}

function useCart(): UseCartProps {
    const [items, setItems] = useLocalStorage<Item[]>("cart", []);
    const finalItems = React.useMemo(() => items, [items]);
    const { toast } = useToast();
    const add = (item: Item) => {
        if (isItemExist(item.slug)) {
            toast({description: "Produit dans le panier"})
            return;
        };

        setItems((oldItems) => {
            return [item, ...oldItems];
        });
    };

    const remove = (idx: number) => {
        setItems((items) => {
            items.splice(idx, 1);
            return [...items];
        });
    };

    const isItemExist = (slug: string) => {
        return finalItems.some((item) => item.slug === slug)
    }

    return {
        items: finalItems,
        add,
        remove,
    };
}

export { useCart };
