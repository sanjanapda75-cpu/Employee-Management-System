import { apiGetAll, apiCreate, apiDelete } from "../services/Payrollservice.js";
import { showAlert } from "../components/Alert.js";
import { resetForm } from "../components/Payrollform.js";
import { $ } from "../utils/dom.js";

// Initialize the controller
export function initPayrollController() {
    loadPayroll();

    const form = $("PayrollForm");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // We only need Employee ID and Status to create the record
            const data = {
                employee_id: $("employee_id_input").value.trim(),
                salary_status: $("salary_status_select").value
            };

            await createNewPayRoll(data);
        });
    }

    const cancelBtn = $("cancelBtn");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            resetForm();
            cancelBtn.classList.add("hidden");
        });
    }
}

// Load data and render the table
export async function loadPayroll() {
    const spinner = $("loadingSpinner");
    const tableContainer = $("PayRollTableContainer");
    const tableBody = $("PayrollTableBody");
    const noDataMsg = $("noPayroll");

    if (spinner) spinner.style.display = "flex"; // Centered spinner
    if (tableContainer) tableContainer.classList.add("hidden");

    try {
        // Fetches ALL employees with their status (Joined Data)
        const records = await apiGetAll();

        if (spinner) spinner.style.display = "none";
        if (tableContainer) tableContainer.classList.remove("hidden");

        if (!records || records.length === 0) {
            if (noDataMsg) noDataMsg.classList.remove("hidden");
            return;
        }

        if (noDataMsg) noDataMsg.classList.add("hidden");
        tableBody.innerHTML = "";

        records.forEach(row => {
            // Logic for Badge Colors
            let badgeColor = "bg-gray-100 text-gray-500"; // Default (Not Started)
            if (row.status === "Paid") badgeColor = "bg-green-100 text-green-700";
            else if (row.status === "Pending") badgeColor = "bg-orange-100 text-orange-700";
            else if (row.status === "Processing") badgeColor = "bg-blue-100 text-blue-700";

            // Action Button Logic:
            // If payroll_id exists, show DELETE (to reset status).
            // If null, show nothing (or you could add a quick 'Add' button).
            const actionButton = row.payroll_id 
                ? `<button onclick="window.triggerDeletePayroll(${row.payroll_id})" class="text-red-500 hover:text-red-700 transition-colors" title="Reset Status">
                     <i class="fa-solid fa-trash"></i>
                   </button>`
                : `<span class="text-xs text-gray-300 italic">No Record</span>`;

            const tr = document.createElement("tr");
            tr.className = "hover:bg-gray-50 border-b border-gray-100 transition-colors";
            
            tr.innerHTML = `
                <td class="px-6 py-4 text-sm text-slate-500">
                    ${row.payroll_id ? '#' + row.payroll_id : '-'}
                </td>
                <td class="px-6 py-4 text-sm font-medium text-slate-900">
                    ${row.employee_id}
                </td>
                <td class="px-6 py-4 text-sm text-slate-600">
                    ${row.name}
                </td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold ${badgeColor}">
                        ${row.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    ${actionButton}
                </td>
            `;
            tableBody.appendChild(tr);
        });

    } catch (error) {
        console.error("Error loading payroll:", error);
        if (spinner) spinner.style.display = "none";
    }
}

// Create new payroll record (or update status)
export async function createNewPayRoll(data) {
    try {
        const res = await apiCreate(data);
        if (res && !res.error) {
            showAlert("Payroll Status Updated!");
            resetForm();
            loadPayroll(); // Reload to see the new status
        } else {
            showAlert("Failed to update status", "error");
        }
    } catch (error) {
        console.error("Error in creating payroll", error);
    }
}

// Delete record (Resets status to 'Not Started')
export async function deletePayRoll(id) {
    if (!confirm("Are you sure? This will reset the employee's status to 'Not Started'.")) return;
    
    try {
        const res = await apiDelete(id);
        if (res) {
            showAlert("Payroll record removed!");
            loadPayroll();
        }
    } catch (error) {
        console.error("Error in deleting payroll", error);
    }
}

// Make delete function globally available for onclick handlers
window.triggerDeletePayroll = (id) => {
    deletePayRoll(id);
};