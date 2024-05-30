import OrderTable from "@/Components/Tables/OrderTable";
import { Button } from "@/Components/ui/button";
import { Heading } from "@/Components/ui/heading";
import { Text } from "@/Components/ui/paragraph";
import AuthLayout from "@/Layouts/AuthLayout";
import { Order, Pagination } from "@/types";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import { MdAdd } from "react-icons/md";

const Index = ({ orders }: { orders: Pagination<Order> }) => {
    return (
        <AuthLayout>
            <Head title="Gestion de commande" />
            <div className="space-y-4">
                <div className="flex sm:flex-row flex-col justify-between sm:items-end gap-4">
                    <div className="space-y-2">
                        <Heading level={3} className="font-medium">
                            Gestion de commande
                        </Heading>

                        <Text className={"max-w-7xl"}>
                            Ici vous pouvez gérer les commande
                        </Text>
                    </div>
                </div>

                <OrderTable orders={orders} />
            </div>
        </AuthLayout>
    );
};

export default Index;
