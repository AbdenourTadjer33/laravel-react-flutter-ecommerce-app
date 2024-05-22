import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head } from "@inertiajs/react";

const Dashboard = () => {
    return (
        <AuthLayout>
            <Head title="Dashboard" />
            this is your dashboard
        </AuthLayout>
    );
};

export default Dashboard;
