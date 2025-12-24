// frontend/assets/js/router/viewrouter.js
import { initEmployeecontroller } from "../controllers/Employeecontroller.js";

async function loadView(path) {
  const html = await fetch(path).then(res => res.text());
  document.querySelector("#app").innerHTML = html;
}

export async function router() {
  const path = window.location.pathname;

  if (path === "/" || path === "/home") {
    await loadView("/frontend/pages/home.html");
  } else if (path === "/employee") {
    await loadView("/frontend/pages/employee.html");
    initEmployeecontroller(); // Loads data and form logic 
  } else if (path === "/all-employees") {
    await loadView("/frontend/pages/all-employees.html");
    // This now triggers loademployees() and renders the table 
    initEmployeecontroller(); 
  } else if (path === "/payroll") {
    await loadView("/frontend/pages/payroll.html");
  } else if (path === "/invoice") {
    await loadView("/frontend/pages/invoice.html");
  } else if (path === "/projects") {
    await loadView("/frontend/pages/projects.html");
  } else if (path === "/events") {
    await loadView("/frontend/pages/events.html");
  }
}

export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });
  window.addEventListener("popstate", router);
}