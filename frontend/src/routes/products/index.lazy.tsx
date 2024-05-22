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
        {/* <pre>{JSON.strinfgify(products, null, 2)}</pre> */}
        <div className="flex items-center gap-4 justify-center">
          {products.map((product) => (
            <Card key={product.slug} {...product} />
          ))}
        </div>
      </Container>
    </>
  );
}
