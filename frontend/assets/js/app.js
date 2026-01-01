import { router, initRouterEvents } from "./router/viewrouter.js";

// Initialize app on page load
window.addEventListener("DOMContentLoaded", () => {
  router();
  initRouterEvents();
});