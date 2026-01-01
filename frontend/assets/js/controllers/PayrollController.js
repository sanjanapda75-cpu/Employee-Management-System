import { apiGetAllPayroll, apiCreatePayroll, apiDeletePayroll } from "../services/Payrollservice.js";
import { $ } from "../utils/dom.js";

export async function initPayrollController() {
    loadPayroll();

    const form = $("PayrollForm");
    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            const data = {
                employee_id: $("employee_id_input").value,
                name: $("employee_name_input").value,
                salary_status: $("salary_status_select").value
            };

            const res = await apiCreatePayroll(data);
            if (res.ok) {
                form.reset();
                loadPayroll();
            }
        };
    }
}

async function loadPayroll() {
    const data = await apiGetAllPayroll();
    const body = $("PayrollTableBody");
    body.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.className = "border-b";
        row.innerHTML = `
            <td class="px-3 py-2">${item.employee_id}</td>
            <td class="px-3 py-2">${item.name}</td>
            <td class="px-3 py-2">${item.salary_status}</td>
            <td class="px-3 py-2">
                <button class="bg-red-500 text-white px-3 py-1 rounded" id="del-${item.id}">Delete</button>
            </td>
        `;
        body.appendChild(row);
        $(`del-${item.id}`).onclick = async () => {
            if (confirm("Delete this record?")) {
                await apiDeletePayroll(item.id);
                loadPayroll();
            }
        };
    });
}