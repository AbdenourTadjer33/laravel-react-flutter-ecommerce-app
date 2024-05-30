import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { FormWrapper } from "@/Components/ui/form";
import { Input, InputError } from "@/Components/ui/input";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Label } from "@radix-ui/react-label";
import React from "react";

const Create = () => {
    const { data, setData, errors, post, processing } = useForm({
        name: "",
        email: "",
        password: "",
        status: true,
    });

    const submitHandler = (e: React.FormEvent) => {
        post(route('admin.admin.store'), {
            preserveScroll: true,
        })
    };

    return (
        <AuthLayout>
            <Head title="Créer admin" />

            <FormWrapper onSubmit={submitHandler} className="space-y-4">
                <div className="space-y-1">
                    <Label>Nom prénom</Label>
                    <Input
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="space-y-1">
                    <Label>Adresse e-mail</Label>
                    <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="space-y-1">
                    <Label>Mot de passe</Label>
                    <Input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                <div>
                    <Label className="inline-flex items-center gap-2">
                        <Checkbox
                            checked={data.status}
                            onCheckedChange={(checked) => setData("status", !!checked)}
                        />{" "}
                        Il peut acceder au dashboard
                    </Label>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="destructive"
                        className="w-full"
                        asChild
                        disabled={processing}
                    >
                        <Link href={route("admin.admin.index")}>Annuler</Link>
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
