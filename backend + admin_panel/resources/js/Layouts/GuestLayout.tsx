import React from "react";

export default function ({ ...props }: React.PropsWithChildren) {
    return (
        <div className="flex flex-col items-center justify-center px-4 py-8 mx-auto h-screen lg:py-0">
            <a
                href="/"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            ></a>
            <div className="w-full sm:max-w-xl" {...props} />
        </div>
    );
}
