import { Link, useForm } from "@inertiajs/react";
import React from "react";
import { FormWrapper } from "../ui/form";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input, InputError } from "../ui/input";

const LoginForm = () => {
    const { data, setData, post, errors, processing, clearErrors } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("login.store"), {
            preserveScroll: true,
        });
    };

    return (
        <FormWrapper
            className="w-full sm:max-w-xl p-6 space-y-4 md:space-y-6"
            onSubmit={submitHandler}
        >
            <h1 className="text-xl font-bold leading-tight tracking-tight text-primary-950 md:text-2xl dark:text-primary-50">
                Connectez-vous à votre compte
            </h1>
            <div>
                <Input
                    id="username"
                    placeholder="Entrez votre email professionnel"
                    value={data.username}
                    onChange={(e) => {
                        clearErrors("username");
                        setData("username", e.target.value);
                    }}
                    autoFocus
                />
                <InputError className="mt-1" message={errors.username} />
            </div>
            <div>
                <Input
                    type="password"
                    id="password"
                    placeholder="*****"
                    value={data.password}
                    onChange={(e) => {
                        clearErrors("password");
                        setData("password", e.target.value);
                    }}
                />
                <InputError className="mt-1" message={errors.password} />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <Checkbox
                            id="remember"
                            onCheckedChange={(checked) =>
                                setData("remember", !!checked)
                            }
                            checked={data.remember}
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <Label htmlFor="remember" className="select-none">
                            Souviens-toi de moi
                        </Label>
                    </div>
                </div>
                <Link
                    href="/"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                    Mot de passe oublié?
                </Link>
            </div>
            <div>
                <Button type="submit" className="w-full" disabled={processing}>
                    Se connecter
                </Button>
            </div>
        </FormWrapper>
    );
};

export default LoginForm;
