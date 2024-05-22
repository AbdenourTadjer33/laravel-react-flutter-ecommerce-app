import * as React from "react";
import { cn } from "@/Lib/utils";

interface FormWrapperProps extends React.FormHTMLAttributes<HTMLFormElement> {
    className?: string;
}

const FormWrapper = React.forwardRef<HTMLFormElement, FormWrapperProps>(
    ({ className, onSubmit, ...props }, ref) => {
        const submit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (onSubmit) onSubmit(event);
        };

        return (
            <form
                ref={ref}
                className={cn(
                    "bg-white dark:bg-gray-800/30 p-4 border dark:border-gray-700 rounded-lg shadow-lg",
                    className
                )}
                onSubmit={submit}
                {...props}
            />
        );
    }
);

FormWrapper.displayName = "FormWrapper";

const SubForm = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
));

export { FormWrapper, SubForm };
