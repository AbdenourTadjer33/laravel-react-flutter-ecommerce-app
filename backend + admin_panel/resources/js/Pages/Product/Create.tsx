import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import { Button } from "@/Components/ui/button";
import { FormWrapper } from "@/Components/ui/form";
import { Input, InputError } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Checkbox } from "@/Components/ui/checkbox";
import { Brand } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/Components/ui/toggle-group";

const Create = ({ brands }: { brands: Brand[] }) => {
    const { data, setData, errors, post, processing, clearErrors } = useForm<{
        name: string;
        description: string;
        price: string;
        status: boolean;
        images: string[];
        sizes: string[];
        brand_id: string;
    }>({
        name: "",
        description: "",
        price: "",
        status: true,
        images: [],
        sizes: [],
        brand_id: "",
    });

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("admin.product.store"), {
            preserveScroll: true,
        });
    };

    return (
        <AuthLayout>
            <Head title="Créer produit" />
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
                        value={data.brand_id}
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

                <div className="space-y-1 col-span-3">
                    <Label>Uploader les images de produits</Label>
                    <Input type="file" accept="image/png, image/jpeg" />
                    <InputError message={errors.images} />
                </div>

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

                <pre>{JSON.stringify(data, null, 2)}</pre>

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
