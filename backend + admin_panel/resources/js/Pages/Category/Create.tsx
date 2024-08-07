import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import { Button } from "@/Components/ui/button";
import { FormWrapper } from "@/Components/ui/form";
import { Input, InputError } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

const Create = () => {
    const { data, setData, errors, post, processing, clearErrors } = useForm({
        name: "",
    });

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("admin.category.store"), {
            preserveScroll: true,
        });
    };

    return (
        <AuthLayout>
            <Head title="Créer categorie" />

            <FormWrapper
                className="grid sm:grid-cols-3 gap-4"
                onSubmit={submitHandler}
                encType="multipart/form-data"
            >
                <div className="space-y-1">
                    <Label>Categorie</Label>
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
                        Créer
                    </Button>
                </div>
            </FormWrapper>
        </AuthLayout>
    );
};

export default Create;
