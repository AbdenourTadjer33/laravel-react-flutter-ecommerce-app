import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { FormWrapper } from "@/Components/ui/form";
import { Input, InputError } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Category } from "@/types";

const Edit = ({ category }: { category: Category }) => {
    const { data, setData, errors, clearErrors, processing, put } = useForm({
        name: category.name || "",
    });

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        put(route("admin.category.update", category.id));
    };

    return (
        <AuthLayout>
            <Head title="Editer brand" />
            <FormWrapper
                className="grid sm:grid-cols-3 gap-4"
                onSubmit={submitHandler}
                encType="multipart/form-data"
            >
                <div className="space-y-1">
                    <Label>Brand</Label>
                    <Input
                        value={data.name}
                        onChange={(e) => {
                            clearErrors("name");
                            setData("name", e.target.value);
                        }}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="col-span-3 flex items-center gap-4">
                    <Button
                        variant="destructive"
                        className="w-full"
                        asChild
                        disabled={processing}
                    >
                        <Link href={route("admin.category.index")}>Annuler</Link>
                    </Button>
                    <Button
                        variant="default"
                        className="w-full"
                        disabled={processing}
                    >
                        Modifier
                    </Button>
                </div>
            </FormWrapper>
        </AuthLayout>
    );
};

export default Edit;
