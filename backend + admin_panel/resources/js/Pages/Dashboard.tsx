import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head } from "@inertiajs/react";

interface Statistics {
    order: {
        new: number;
        confirmed: number;
        cancled: number;
    };
    product: {
        active: number;
        disabled: number;
    };
}

const Dashboard = ({ statistics }: { statistics: Statistics }) => {
    const { order, product } = statistics;
    return (
        <AuthLayout>
            <Head title="Dashboard" />

            <div className="space-y-10">
                <div className="grid sm:grid-cols-2 gap-4">
                    <Widget
                        title="Produit"
                        description="Produits activé"
                        count={product.active}
                    />
                    <Widget
                        title="Produit"
                        description="Produits non activé"
                        count={product.disabled}
                    />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                    <Widget
                        title="Commande"
                        description="Nouvelle commande"
                        count={order.new}
                    />

                    <Widget
                        title="Commande"
                        description="Commande confirmer"
                        count={order.confirmed}
                    />

                    <Widget
                        title="Commande"
                        description="Commande annuler"
                        count={order.cancled}
                    />
                </div>
            </div>
        </AuthLayout>
    );
};

const Widget = ({
    title,
    description,
    count,
}: {
    title: string;
    description: string;
    count: string | number;
}) => {
    return (
        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="w-full">
                <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">
                    {title}
                </h3>
                <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                    {count}
                </span>
                <p className="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                    <span className="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                            ></path>
                        </svg>
                    </span>
                    {description ?? ""}
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
