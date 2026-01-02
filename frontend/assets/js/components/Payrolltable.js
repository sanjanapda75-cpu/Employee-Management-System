import { $ } from "../utils/dom.js";
import { editpayroll, deletepayrollAction } from "../controllers/PayrollController.js";

export function renderPayrolltable(payrolls) {
  // Line 11 is usually around here
  const body = $("PayrollTableBody");
  const nopayroll = $("noPayroll");

  body.innerHTML = "";

  if (payrolls.length === 0) {
    if (nopayroll) nopayroll.style.display = "block";
    return;
  }

  if (nopayroll) nopayroll.style.display = "none";

  payrolls.forEach(record => {
    const row = document.createElement("tr");
    row.className = "border-b";

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

    row.querySelector("[data-edit]").onclick = () => editpayroll(record.id);
    row.querySelector("[data-delete]").onclick = () => deletepayrollAction(record.id);

    body.appendChild(row);
  });
}