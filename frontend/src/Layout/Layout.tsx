import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Link, Outlet } from "@tanstack/react-router";
import { CartContextProvider } from "@/contexts/cartContext";
import { Toaster } from "@/components/ui/toaster";

const Layout = () => {
    return (
        <CartContextProvider>
            <Navbar />
            <Outlet />
            <Toaster />
            <Footer />

        </CartContextProvider>
    );
};

export default Layout;
