import React from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useToast } from "@/components/ui/use-toast";

export type Item = {
    slug: string;
    qte: number;
    size?: number | string | undefined;
};

export interface UseCartProps {
    items: Item[];
    add: (item: Item) => void;
    remove: (idx: keyof Item[]) => void;
    update: (idx: keyof Item[], callBack: (item: Item) => Item) => void;
    addItems: (items: Item[]) => void;
    removeAll: () => void;
}

function useCart(): UseCartProps {
    const [items, setItems] = useLocalStorage<Item[]>("cart", []);
    const finalItems = React.useMemo(() => items, [items]);
    const { toast } = useToast();

    const add = (item: Item) => {
        if (isItemExist(item.slug)) {
            toast({ description: "Produit est deja dans le panier" })
            return;
        };

        setItems((oldItems) => {
            return [item, ...oldItems];
        });
        toast({ description: "Produit est ajouté au panier" })
    };

    const remove = (idx: number) => {
        setItems((items) => {
            items.splice(idx, 1);
            return [...items];
        });
    };

    const update = (idx: number, callBack: (item: Item) => Item) => {
        setItems((items) => {
            items[idx] = callBack(items[idx])
            return [...items];
        })
    }

    const addItems = (items: Item[]) => {
        setItems(items);
    }

    const removeAll = () => {
        setItems([]);
    }

    const isItemExist = (slug: string) => {
        return finalItems.some((item) => item.slug === slug)
    }

    return {
        items: finalItems,
        add,
        remove,
        update,
        addItems,
        removeAll
    };
}

export { useCart };
