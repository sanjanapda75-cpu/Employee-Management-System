import { $ } from "../utils/dom.js";
import { editPayroll, deletePayRoll } from "../controllers/PayrollController.js";

/**
 * Renders the list of payroll records into the HTML table
 * @param {Array} payrolls - Array of payroll objects
 */
export function renderPayrolltable(payrolls) {
  const body = $("PayrollTableBody");
  const nopayroll = $("noPayroll");

  // Clear any existing rows before rendering new data
  body.innerHTML = "";

  // Check if the data array is empty
  if (!payrolls || payrolls.length === 0) {
    // Show 'no records' message if empty
    if (nopayroll) nopayroll.style.display = "block";
    return;
  }

  // Hide the 'no records' message if data exists
  if (nopayroll) nopayroll.style.display = "none";

  // Iterate over each payroll record
  payrolls.forEach(record => {
    // Create a new table row
    const row = document.createElement("tr");
    row.className = "border-b";

    // Populate row with ID, Employee Name, and Salary Status
    row.innerHTML = `
      <td class="px-3 py-2">${record.employee_id}</td>
      <td class="px-3 py-2">${record.name}</td>
      <td class="px-3 py-2">${record.salary_status}</td>
      <td class="px-3 py-2 flex space-x-2">
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${record.id}">Edit</button>

        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${record.id}">Delete</button>
      </td>
    `;

    // FIXED: Correct function names
    row.querySelector("[data-edit]").onclick = () => editPayroll(record.id);
    row.querySelector("[data-delete]").onclick = () => deletePayRoll(record.id);

    // Append the row to the payroll table body
    body.appendChild(row);
  });
}