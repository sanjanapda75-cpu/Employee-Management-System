import { initEmployeecontroller } from "../controllers/Employeecontroller.js";
import { initPayrollController } from "../controllers/PayrollController.js";
import { initProjectController } from "../controllers/ProjectController.js"; 

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
    initEmployeecontroller();
  } else if (path === "/all-employees") {
    await loadView("/frontend/pages/all-employees.html");
    initEmployeecontroller();
  } else if (path === "/payroll") {
    await loadView("/frontend/pages/payroll.html");
    initPayrollController();
  } else if (path === "/invoice") {
    await loadView("/frontend/pages/invoice.html");
  } else if (path === "/projects") {
    await loadView("/frontend/pages/projects.html");
    initProjectController(); 
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