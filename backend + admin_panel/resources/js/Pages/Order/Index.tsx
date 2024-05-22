import AuthLayout from "@/Layouts/AuthLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Index = () => {
    return (
        <AuthLayout>
            <Head title="Gestion de commande" />
            Gestion de commande
        </AuthLayout>
    );
};

export default Index;
