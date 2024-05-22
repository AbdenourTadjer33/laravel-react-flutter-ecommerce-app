import { Container } from "@/components/ui/container";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/products/$slug")({
  component: Product,
});

function Product() {
  const product = Route.useLoaderData();

  return (
    <>
      <Container>
        <pre>{JSON.stringify(product, null, 2)}</pre>
      </Container>
    </>
  );
}
