import { initEmployeecontroller } from "../controllers/Employeecontroller.js";

// Load a view into #app container
async function loadView(path) {
  const html = await fetch(path).then(res => res.text());
  console.log(html)
  document.querySelector("#app").innerHTML = html;
}

// Decide which view to load based on URL
export async function router() {
  const path = window.location.pathname;

  if (path === "/" || path === "/home") {
        await loadView("/frontend/pages/home.html");
    } else if (path === "/employee") {
        await loadView("/frontend/pages/employee.html");
        initEmployeecontroller();
    } else if (path === "/all-employees") {
        await loadView("/frontend/pages/all-employees.html");
        // Reuse loademployees from controller
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

// Make links work without page reload
export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });

  // Back/forward buttons support
  window.addEventListener("popstate", router);
}