import { Card } from "@/components/product/card";
import { Container } from "@/components/ui/container";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/products/")({
  component: Products,
});

function Products() {
  const products = Route.useLoaderData();

  return (
    <>
      <Container>
        <div className="flex items-center justify-center flex-wrap gap-4">
          {products.map((product) => (
            <Card key={product.slug} {...product} />
          ))}
        </div>
      </Container>
    </>
  );
}
