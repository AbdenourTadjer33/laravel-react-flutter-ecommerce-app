const Ziggy = {
    url: "http://localhost:8000",
    port: 8000,
    defaults: {},
    routes: {
        "debugbar.openhandler": {
            uri: "_debugbar/open",
            methods: ["GET", "HEAD"],
        },
        "debugbar.clockwork": {
            uri: "_debugbar/clockwork/{id}",
            methods: ["GET", "HEAD"],
            parameters: ["id"],
        },
        "debugbar.assets.css": {
            uri: "_debugbar/assets/stylesheets",
            methods: ["GET", "HEAD"],
        },
        "debugbar.assets.js": {
            uri: "_debugbar/assets/javascript",
            methods: ["GET", "HEAD"],
        },
        "debugbar.cache.delete": {
            uri: "_debugbar/cache/{key}/{tags?}",
            methods: ["DELETE"],
            parameters: ["key", "tags"],
        },
        "sanctum.csrf-cookie": {
            uri: "sanctum/csrf-cookie",
            methods: ["GET", "HEAD"],
        },
        "ignition.healthCheck": {
            uri: "_ignition/health-check",
            methods: ["GET", "HEAD"],
        },
        "ignition.executeSolution": {
            uri: "_ignition/execute-solution",
            methods: ["POST"],
        },
        "ignition.updateConfig": {
            uri: "_ignition/update-config",
            methods: ["POST"],
        },
        "login.create": { uri: "login", methods: ["GET", "HEAD"] },
        "login.store": { uri: "login", methods: ["POST"] },
        "password.email": { uri: "forgot-password", methods: ["POST"] },
        "password.store": { uri: "reset-password", methods: ["POST"] },
        logout: { uri: "logout", methods: ["POST"] },
        "admin.dashboard": { uri: "admin", methods: ["GET", "HEAD"] },
        "admin.brand.index": { uri: "admin/brands", methods: ["GET", "HEAD"] },
        "admin.brand.create": {
            uri: "admin/brands/create",
            methods: ["GET", "HEAD"],
        },
        "admin.brand.store": { uri: "admin/brands", methods: ["POST"] },
        "admin.brand.show": {
            uri: "admin/brands/{brand}",
            methods: ["GET", "HEAD"],
            parameters: ["brand"],
        },
        "admin.brand.edit": {
            uri: "admin/brands/{brand}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["brand"],
            bindings: { brand: "id" },
        },
        "admin.brand.update": {
            uri: "admin/brands/{brand}",
            methods: ["PUT", "PATCH"],
            parameters: ["brand"],
            bindings: { brand: "id" },
        },
        "admin.brand.destroy": {
            uri: "admin/brands/{brand}",
            methods: ["DELETE"],
            parameters: ["brand"],
            bindings: { brand: "id" },
        },
        "admin.product.index": {
            uri: "admin/products",
            methods: ["GET", "HEAD"],
        },
        "admin.product.create": {
            uri: "admin/products/create",
            methods: ["GET", "HEAD"],
        },
        "admin.product.store": { uri: "admin/products", methods: ["POST"] },
        "admin.product.show": {
            uri: "admin/products/{product}",
            methods: ["GET", "HEAD"],
            parameters: ["product"],
        },
        "admin.product.edit": {
            uri: "admin/products/{product}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["product"],
            bindings: { product: "id" },
        },
        "admin.product.update": {
            uri: "admin/products/{product}",
            methods: ["PUT", "PATCH"],
            parameters: ["product"],
            bindings: { product: "id" },
        },
        "admin.product.destroy": {
            uri: "admin/products/{product}",
            methods: ["DELETE"],
            parameters: ["product"],
            bindings: { product: "id" },
        },
        "admin.order.index": { uri: "admin/orders", methods: ["GET", "HEAD"] },
        "admin.order.create": {
            uri: "admin/orders/create",
            methods: ["GET", "HEAD"],
        },
        "admin.order.store": { uri: "admin/orders", methods: ["POST"] },
        "admin.order.show": {
            uri: "admin/orders/{order}",
            methods: ["GET", "HEAD"],
            parameters: ["order"],
        },
        "admin.order.edit": {
            uri: "admin/orders/{order}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["order"],
        },
        "admin.order.update": {
            uri: "admin/orders/{order}",
            methods: ["PUT", "PATCH"],
            parameters: ["order"],
        },
        "admin.order.destroy": {
            uri: "admin/orders/{order}",
            methods: ["DELETE"],
            parameters: ["order"],
        },
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
