import React from "react";
import { cn } from "@/lib/utils";

const Container = ({ className, ...props }: React.HTMLProps<HTMLDivElement>) => (
  <div className={cn("max-w-screen-xl mx-auto p-4", className)} {...props} />
);

export { Container };
