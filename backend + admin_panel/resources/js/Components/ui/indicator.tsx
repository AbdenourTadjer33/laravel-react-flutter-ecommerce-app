import { cn } from "@/Lib/utils";
import React from "react";

export function Indicator({
    color,
    className,
}: {
    color: string | boolean;
    className?: string;
}): React.ReactNode {
    const colors: { [key: string]: string } = {
        gray: "bg-gray-200",
        dark: "bg-gray-900",
        blue: "bg-blue-600",
        green: "bg-green-500",
        red: "bg-red-500",
        purple: "bg-purple-500",
        indigo: "bg-indigo-500",
    };

    if (typeof color === "boolean") {
        return (
            <span
                className={cn(
                    `flex w-3 h-3 rounded-full data-[state=true]:bg-green-500 data-[state=false]:bg-red-500`,
                    className
                )}
                data-state={color}
            />
        );
    }

    return (
        <span
            className={`flex w-3 h-3 rounded-full ${colors[color]} ${className}`}
        />
    );
}
