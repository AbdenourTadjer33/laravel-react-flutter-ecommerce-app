import { Container } from "@/components/ui/container";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Container>Index</Container>
    </>
  );
}
