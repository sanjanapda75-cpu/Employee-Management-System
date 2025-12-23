import { $ } from "../utils/dom.js";
import { editemployee, deleteemployeeAction } from "../controllers/Employeecontroller.js";

// Renders the list of employees into an HTML table
export function renderEmployeetable(employee) {
  // Get references to the table body where rows will be inserted and the 'no employees' message
  const body = $("EmployeeTableBody");
  const noemployee = $("noemployee");

  // Clear any existing rows from the table body before rendering new data
  body.innerHTML = "";

  // Check if the employee array is empty
  if (employee.length === 0) {
    // If no employees are found, display the 'no employees' message and stop execution
    noemployee.style.display = "block";
    return;
  }

  // If employees exist, hide the 'no employees' message
  noemployee.style.display = "none";

  // Iterate over each employee object in the provided array
  employee.forEach(employee => {
    // Create a new table row element for the current employee
    const row = document.createElement("tr");
    row.className = "border-b"; // Add styling class (likely Tailwind CSS)

    // Populate the row with dynamic HTML content using a template literal
    row.innerHTML = `
      <td class="px-3 py-2">${employee.id}</td>
      <td class="px-3 py-2">${employee.name}</td>
      <td class="px-3 py-2">${employee.email}</td>
      <td class="px-3 py-2">${employee.address}</td>
      <td class="px-3 py-2">${employee.department}</td>
      <td class="px-3 py-2">${employee.salary_status}</td>
      <td class="px-3 py-2 flex space-x-2">
        <!-- Buttons are created with data attributes holding the employee ID -->
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${employee.id}">Edit</button>

        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${employee.id}">Delete</button>
      </td>
    `;

    // --- Attach event listeners to the newly created buttons ---

    // Find the 'Edit' button within this specific row and attach a click handler
    // When clicked, call the editemployee function with the correct employee ID
    row.querySelector("[data-edit]").onclick = () => editemployee(employee.id);
    
    // Find the 'Delete' button within this specific row and attach a click handler
    // When clicked, call the deleteemployeeAction function with the correct employee ID
    row.querySelector("[data-delete]").onclick = () => deleteemployeeAction(employee.id);

    // Append the fully constructed row to the table body
    body.appendChild(row);
  });
}