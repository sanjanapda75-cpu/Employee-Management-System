import { $ } from "../utils/dom.js";

export function renderPayrolltable(payrolls, editCallback, deleteCallback) {
    const body = $("PayrollTableBody");
    const noData = $("noPayroll");

    if (!body) {
        console.error("PayrollTableBody not found!");
        return;
    }

    body.innerHTML = "";

    if (!payrolls || payrolls.length === 0) {
        if (noData) noData.style.display = "block";
        return;
    }

    if (noData) noData.style.display = "none";

    payrolls.forEach(payroll => {
        const row = document.createElement("tr");
        row.className = "border-b hover:bg-gray-50";

        row.innerHTML = `
            <td class="px-3 py-2">${payroll.id}</td>
            <td class="px-3 py-2">${escapeHtml(payroll.employee_id)}</td>
            <td class="px-3 py-2 font-medium">${escapeHtml(payroll.name)}</td>
            <td class="px-3 py-2">${escapeHtml(payroll.salary_status)}</td>
            <td class="px-3 py-2 flex space-x-2">
                <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded" data-edit="${payroll.id}">
                    Edit
                </button>
                <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded" data-delete="${payroll.id}">
                    Delete
                </button>
            </td>
        `;

        const editBtn = row.querySelector("[data-edit]");
        const deleteBtn = row.querySelector("[data-delete]");
        
        if (editBtn && editCallback) editBtn.onclick = () => editCallback(payroll.id);
        if (deleteBtn && deleteCallback) deleteBtn.onclick = () => deleteCallback(payroll.id);

        body.appendChild(row);
    });
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}