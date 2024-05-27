import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import { Button } from "@/Components/ui/button";
import { FormWrapper } from "@/Components/ui/form";
import { Input, InputError } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { storeImages } from "@/Service/files";

const Create = () => {
    const { data, setData, errors, post, processing, clearErrors } = useForm({
        name: "",
        logo: "",
    });

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = e.target.files;
        if (!files || !files.length) return;

        const formData = new FormData();

        Array.from(files).map((file) => {
            formData.append("image", file);
        });

        const response = await storeImages(formData);
        setData("logo", response);

        e.target.value = "";
    };

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("admin.brand.store"), {
            preserveScroll: true,
        });
    };

    return (
        <AuthLayout>
            <Head title="Créer brand" />

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

                <div className="space-y-1 col-span-3">
                    <Label>Uploader logo de brand</Label>
                    <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleImageUpload}
                    />
                    <InputError message={errors.logo} />
                </div>

                {data.logo && (
                    <div
                        className="relative shrink-0 hover:opacity-50 transition-opacity duration-150 cursor-pointer"
                        onClick={() => setData("logo", "")}
                    >
                        <img src={data.logo} className="h-24 w-auto" />
                    </div>
                )}

                <div className="col-span-3 flex items-center gap-4">
                    <Button
                        variant="destructive"
                        className="w-full"
                        asChild
                        disabled={processing}
                    >
                        <Link href={route("admin.product.index")}>Annuler</Link>
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
