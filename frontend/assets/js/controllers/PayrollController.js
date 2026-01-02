import { apiGetAllPayroll, apiCreatePayroll, apiDeletePayroll } from "../services/Payrollservice.js";
import { renderPayrolltable } from "../components/Payrolltable.js";
import { $ } from "../utils/dom.js";

// Initialize the controller and load data [cite: 782, 1034]
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
                await loadPayroll();
            }
        };
    }
}

// Fetch data and trigger table rendering [cite: 787, 912, 972]
export async function loadPayroll() {
    const data = await apiGetAllPayroll();
    renderPayrolltable(data);
}

// Exported for Payrolltable.js [cite: 506, 1085]
export async function deletepayrollAction(id) {
    if (confirm("Delete this record?")) {
        const res = await apiDeletePayroll(id);
        if (res.ok) await loadPayroll();
    }
}

// Exported for Payrolltable.js [cite: 506, 1015]
export function editpayroll(id) {
    console.log("Edit payroll for ID:", id);
    // Future implementation: fetch data and fillForm(payroll) [cite: 1016, 1048]
}