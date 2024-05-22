import { getProduct } from "@/services/product";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ params }) => await getProduct(params.slug),
});
