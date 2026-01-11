import { apiCreate, apiDelete, apiUpdate, apiGetAll, apiGetOne } from "../services/Payrollservice.js";
import { showAlert } from "../components/Alert.js";
import { renderPayrolltable } from "../components/Payrolltable.js";
import { resetForm, fillForm } from "../components/Payrollform.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize the controller
export async function initPayrollController() {
    loadPayroll();

    const form = $("PayrollForm");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const data = {
                employee_id: $("employee_id_input").value,
                name: $("employee_name_input").value,
                salary_status: $("salary_status_select").value
            };

            const { editingId } = getState();

            editingId
                ? await updatePayRoll(editingId, data)
                : await createNewPayRoll(data);
        });
    }

    const cancelBtn = $("cancelBtn");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            setState({ editingId: null });
            resetForm();
        });
    }
}

// Load data with spinner
async function loadPayroll() {
    const spinner = $("loadingSpinner");
    const table = $("PayRollTableContainer");

    if (spinner) spinner.style.display = "block";
    if (table) table.style.display = "none";

    const payroll = await apiGetAll();
    renderPayrolltable(payroll, editPayroll, deletePayRoll);

    if (spinner) spinner.style.display = "none";
    if (table) table.style.display = "block";
}

// Create new payroll record
export async function createNewPayRoll(data) {
    try {
        const res = await apiCreate(data);
        if (res && res.ok) {
            showAlert("Payroll added");
            resetForm();
            loadPayroll();
        }
    } catch (error) {
        console.error("Error in creating payroll", error);
    }
}

// Prepare form for editing
export async function editPayroll(id) {
    try {
        const payroll = await apiGetOne(id);
        if (!payroll) {
            showAlert("Payroll not found");
            return;
        }

        setState({ editingId: id });
        fillForm(payroll);

        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
        console.error(`Error in editing payroll ${id}`, error);
    }
}

// Update existing record
export async function updatePayRoll(id, data) {
    try {
        const res = await apiUpdate(id, data);
        if (res && res.ok) {
            showAlert("Updated!");
            resetForm();
            setState({ editingId: null });
            loadPayroll();
        }
        return res;
    } catch (error) {
        console.error("Error in updating payroll", error);
    }
}

// Delete record
export async function deletePayRoll(id) {
    if (!confirm("Delete this payroll record?")) return;
    try {
        const res = await apiDelete(id);
        if (res && res.ok) {
            showAlert("Deleted!");
            loadPayroll();
        }
        return res;
    } catch (error) {
        console.error("Error in deleting payroll", error);
    }
}