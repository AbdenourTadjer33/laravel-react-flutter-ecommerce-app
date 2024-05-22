const Ziggy = {
  url: "http://localhost:8000",
  port: 8000,
  defaults: {},
  routes: {
    "api.product.index": { uri: "api/products", methods: ["GET", "HEAD"] },
    "api.product.show": {
      uri: "api/products/{product}",
      methods: ["GET", "HEAD"],
      parameters: ["product"],
      bindings: { product: "id" },
    },
  },
};
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
