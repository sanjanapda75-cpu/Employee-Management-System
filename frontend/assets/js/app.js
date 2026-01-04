import { router, initRouterEvents } from "./router/viewrouter.js";

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
    console.log("✓ App initialized");
    initRouterEvents();
    router();
});