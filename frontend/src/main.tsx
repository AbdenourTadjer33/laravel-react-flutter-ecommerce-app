import "./app.css";
import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Ziggy } from "./ziggy";
import { route } from "ziggy-js";

globalThis.Ziggy = Ziggy;
globalThis.route = route;

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
