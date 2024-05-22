import Navbar from "@/Components/Block/Navbar";
import { Toaster } from "@/Components/ui/toaster";
import { useToast } from "@/Components/ui/use-toast";
import { usePage } from "@inertiajs/react";
import React from "react";

export default function ({ ...props }: React.PropsWithChildren) {
    const { flash } = usePage().props;
    const { toast } = useToast();

    React.useEffect(() => {
        if ((flash as any).alert) {
            toast({ description: (flash as any).alert.message });
        }
    }, [(flash as any).alert]);

    return (
        <>
            <Navbar />
            <main className="p-4 h-auto" {...props} />
            <Toaster />
        </>
    );
}
