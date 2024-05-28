import React from "react";
import { Button } from "@/Components/ui/button";
import { Heading } from "@/Components/ui/heading";
import { Text } from "@/Components/ui/paragraph";
import AuthLayout from "@/Layouts/AuthLayout";
import { Admin, Pagination } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { MdAdd } from "react-icons/md";
import AdminTable from "@/Components/Tables/AdminTable";

const Index = ({ admins }: { admins: Pagination<Admin> }) => {
    return (
        <AuthLayout>
            <Head title="Gestion d'administrateur" />

            <div className="space-y-4">
                <div className="flex sm:flex-row flex-col justify-between sm:items-end gap-4">
                    <div className="space-y-2">
                        <Heading level={3} className="font-medium">
                            Gestion de produits
                        </Heading>

                        <Text className={"max-w-7xl"}>
                            Ici vous pouvez gérer les administrateur
                        </Text>
                    </div>

                    <Button asChild>
                        <Link href={route("admin.admin.create")}>
                            <MdAdd className="w-4 h-4 mr-2" />
                            Ajouter un admin
                        </Link>
                    </Button>
                </div>

                <AdminTable admins={admins} />
            </div>
        </AuthLayout>
    );
};

export default Index;
