import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { FormWrapper } from "@/Components/ui/form";
import { Input, InputError } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import { Category, Product } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { destroy, store } from "@/Service/files";
import { MdDelete } from "react-icons/md";
import { ToggleGroup, ToggleGroupItem } from "@/Components/ui/toggle-group";

const Edit = ({ product, categories }: { product: Product; categories: Category[] }) => {
    const { data, setData, errors, clearErrors, processing, put } = useForm<{
        name: string;
        description: string;
        price: string;
        status: boolean;
        images: string[];
        sizes: string[];
        category_id: string;
        brand: string,
    }>({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        status: product.status,
        images: product.images || [],
        sizes: product.sizes || [],
        category_id: product.category_id || "",
        brand: product.brand || "",
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

        const response = await store(formData);
        setData("images", [...data.images, ...response]);

        e.target.value = "";
    };

    const deleteImage = async (id: string, idx: number) => {
        setData("images", data.images.splice(idx, 1));
        await destroy(id);
    };

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        put(route("admin.product.update", product.slug));
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
                    <Label>Categorie</Label>
                    <Select
                        value={String(data.category_id)}
                        onValueChange={(value) => {
                            clearErrors("category_id");
                            setData("category_id", value);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="selectionner une categorie" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem
                                    key={category.id}
                                    value={String(category.id)}
                                >
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.category_id} />
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

                <div className="space-y-1 col-span-2">
                    <Label>Séléctionnez les pointeur disponible</Label>
                    <ToggleGroup
                        variant="outline"
                        type="multiple"
                        value={data.sizes}
                        onValueChange={(values) =>
                            setData(
                                "sizes",
                                values.sort((a, b) => parseInt(a) - parseInt(b))
                            )
                        }
                        className="justify-start"
                    >
                        {Array.from(
                            { length: 10 },
                            (_, index) => 36 + index
                        ).map((idx) => (
                            <ToggleGroupItem key={idx} value={String(idx)}>
                                {idx}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                    <InputError message={errors.sizes} />
                </div>

                <div className="space-y-1">
                    <Label>Brand</Label>
                    <Input
                        value={data.brand}
                        onChange={(e) => setData("brand", e.target.value)}
                    />
                </div>

                <div className="space-y-1 col-span-3">
                    <Label>Uploader les images de produits</Label>
                    <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        multiple
                        onChange={handleImageUpload}
                        max={3}
                    />
                    <InputError message={errors.images} />
                </div>

                {!!data.images.length && (
                    <div className="flex items-center justify-start gap-4 overflow-auto col-span-3">
                        {data.images.map((image, idx) => (
                            <div key={idx} className="relative shrink-0 group">
                                <img src={image} className="h-28 w-auto" />

                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => deleteImage(image, idx)}
                                >
                                    <MdDelete className="w-5 h-5" />
                                </Button>
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
