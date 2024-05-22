import * as React from "react";
import LoginForm from "@/Components/Form/LoginForm";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

const Login = () => {
    return (
        <GuestLayout>
            <Head title="Se connecté" />
            <LoginForm />
        </GuestLayout>
    );
};

export default Login;
