import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import { Pagination, Category } from "@/types";
import { Button } from "@/Components/ui/button";
import { Text } from "@/Components/ui/paragraph";
import { Heading } from "@/Components/ui/heading";
import { MdAdd } from "react-icons/md";
import CategoryTable from "@/Components/Tables/CategoryTable";

const Index = ({ categories }: { categories: Pagination<Category> }) => {
    return (
        <AuthLayout>
            <Head title="Gestion de produit" />

            <div className="space-y-4">
                <div className="flex sm:flex-row flex-col justify-between sm:items-end gap-4">
                    <div className="space-y-2">
                        <Heading level={3} className="font-medium">
                            Gestion de categorie
                        </Heading>

                        <Text className={"max-w-7xl"}>
                            Ici vous pouvez gérer tous les categories
                        </Text>
                    </div>

                    <Button asChild>
                        <Link href={route("admin.category.create")}>
                            <MdAdd className="w-4 h-4 mr-2" />
                            Ajouter une categorie
                        </Link>
                    </Button>
                </div>

                <CategoryTable categories={categories} />
            </div>
        </AuthLayout>
    );
};

export default Index;
