import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { FormWrapper } from "@/Components/ui/form";
import { Input, InputError } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Brand } from "@/types";
import { destroy, store } from "@/Service/files";
import { MdDelete } from "react-icons/md";

const Edit = ({ brand }: { brand: Brand }) => {
    const { data, setData, errors, clearErrors, processing, put } = useForm({
        name: brand.name || "",
        logo: brand.logo || "",
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

        if (data.logo) {
            await deleteImage(data.logo);
        }

        const response = await store(formData);
        setData("logo", response);

        e.target.value = "";
    };

    const deleteImage = async (id: string) => {
        setData("logo", "");
        await destroy(id);
    }


    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        put(route("admin.brand.update", brand.id));
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
                    <div className="relative shrink-0 group">
                        <img src={data.logo} className="h-24 w-auto" />
                        <Button
                            size="icon"
                            variant="destructive"
                            className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => deleteImage(data.logo)}
                        >
                            <MdDelete className="w-5 h-5" />
                        </Button>
                    </div>
                )}

                <div className="col-span-3 flex items-center gap-4">
                    <Button
                        variant="destructive"
                        className="w-full"
                        asChild
                        disabled={processing}
                    >
                        <Link href={route("admin.brand.index")}>Annuler</Link>
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
