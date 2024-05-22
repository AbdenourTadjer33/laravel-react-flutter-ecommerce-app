import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/order/create")({
  component: () => <div>Hello /order/new!</div>,
});
