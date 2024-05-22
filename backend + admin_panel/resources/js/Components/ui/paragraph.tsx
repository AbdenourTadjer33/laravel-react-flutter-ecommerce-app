import { cn } from "@/Lib/utils";
import React from "react";

export function Text({
    className,
    ...props
}: React.HTMLProps<HTMLParagraphElement>) {
    return (
        <p
            className={cn(
                "text-base text-gray-500 dark:text-gray-400 text-pretty",
                className
            )}
            {...props}
        />
    );
}
