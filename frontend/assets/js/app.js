import { initEmployeecontroller } from "./controllers/Employeecontroller.js";
import { router } from "./router/viewrouter.js";

// Initialize app on page load
window.addEventListener("DOMContentLoaded", () => {
  router();
  initEmployeecontroller();
});