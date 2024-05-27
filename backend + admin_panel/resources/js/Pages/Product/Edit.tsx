import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { FormWrapper } from "@/Components/ui/form";
import { Input, InputError } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import { Brand, Product } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { storeImages } from "@/Service/files";

const Edit = ({ product, brands }: { product: Product; brands: Brand[] }) => {
    const { data, setData, errors, clearErrors, processing, put } = useForm<{
        name: string;
        description: string;
        price: string;
        status: boolean;
        images: string[];
        sizes: string[];
        brand_id: string;
    }>({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        status: product.status,
        images: product.images || [],
        sizes: product.sizes || [],
        brand_id: product.brand_id || "",
    });

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = e.target.files;
        if (!files || !files.length) return;

        const formData = new FormData();

        Array.from(files).map((file) => {
            formData.append("images[]", file);
        });

        const response = await storeImages(formData);
        setData("images", [data.images, ...response]);

        e.target.value = "";
    };

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        put(route("admin.product.update", product.id));
    };

    return (
        <AuthLayout>
            <Head title="Editer produit" />
            <FormWrapper
                className="grid sm:grid-cols-3 gap-4"
                onSubmit={submitHandler}
                encType="multipart/form-data"
            >
                <div className="space-y-1">
                    <Label>Produit</Label>
                    <Input
                        value={data.name}
                        onChange={(e) => {
                            clearErrors("name");
                            setData("name", e.target.value);
                        }}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="space-y-1">
                    <Label>Prix</Label>
                    <Input
                        value={data.price}
                        onChange={(e) => {
                            clearErrors("price");
                            setData("price", e.target.value);
                        }}
                    />
                    <InputError message={errors.price} />
                </div>

                <div className="space-y-1">
                    <Label>Brand</Label>
                    <Select
                        value={String(data.brand_id)}
                        onValueChange={(value) => {
                            clearErrors("brand_id");
                            setData("brand_id", value);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="brand" />
                        </SelectTrigger>
                        <SelectContent>
                            {brands.map((brand) => (
                                <SelectItem
                                    key={brand.id}
                                    value={String(brand.id)}
                                >
                                    {brand.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.brand_id} />
                </div>

                <div className="space-y-1 col-span-3">
                    <Label>Description</Label>
                    <Textarea
                        value={data.description}
                        onChange={(e) => {
                            clearErrors("description");
                            setData("description", e.target.value);
                        }}
                    />
                    <InputError message={errors.description} />
                </div>

                <div className="space-y-1 col-span-3">
                    <Label>Uploader les images de produits</Label>
                    <Input type="file" accept="image/png, image/jpeg" multiple onChange={handleImageUpload} max={3} />
                    <InputError message={errors.images} />
                </div>

                {!!data.images.length && (
                    <div className="flex items-center justify-start gap-4 overflow-auto col-span-3">
                        {data.images.map((image, idx) => (
                            <div
                                key={idx}
                                className="relative shrink-0 hover:opacity-50 transition-opacity duration-150 cursor-pointer"
                                onClick={() => deleteImage(idx)}
                            >
                                <img src={image} className="h-28 w-auto" />
                            </div>
                        ))}
                    </div>
                )}

                <div className="col-span-3">
                    <Label className="inline-flex items-center gap-2">
                        <Checkbox
                            checked={data.status}
                            onCheckedChange={(checked) =>
                                setData("status", !!checked)
                            }
                        />{" "}
                        Disponible en stock
                    </Label>
                </div>

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
                        Modifier
                    </Button>
                </div>
            </FormWrapper>
        </AuthLayout>
    );
};

export default Edit;
