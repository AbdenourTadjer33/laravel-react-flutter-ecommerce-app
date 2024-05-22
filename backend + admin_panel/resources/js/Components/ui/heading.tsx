import React from "react";
import { cn } from "@/Lib/utils";

interface HeadingLevels {
    [key: number]: string;
}

const HeadingLevels: HeadingLevels = {
    1: "text-5xl font-extrabold dark:text-white",
    2: "text-4xl font-bold dark:text-white",
    3: "text-3xl font-bold dark:text-white",
    4: "text-2xl font-medium dark:text-white",
    5: "text-xl font-medium dark:text-white",
    6: "text-lg font-medium dark:text-white",
};

interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> {
    level?: keyof HeadingLevels;
}

export function Heading({ level = 1, className, ...props }: HeadingProps) {
    return React.createElement(`h${level}`, {
        className: cn(HeadingLevels[level], className),
        ...props,
    });
}
