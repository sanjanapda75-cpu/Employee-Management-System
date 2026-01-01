import { $ } from "../utils/dom.js";

// Resets the input form to its default state for creating a new payroll record
export function resetForm() {
  const form = $("PayrollForm");
  if (form) {
    form.reset();
  }

  const submitBtn = $("submitBtn");
  if (submitBtn) {
    submitBtn.textContent = "Add Payroll";
  }

  const cancelBtn = $("cancelBtn");
  if (cancelBtn) {
    cancelBtn.style.display = "none";
  }
}

// Populates the input form fields with data from a selected payroll object (for editing)
export function fillForm(payroll) {
  const employeeIdInput = $("employee_id_input");
  const employeeNameInput = $("employee_name_input");
  const salaryStatusSelect = $("salary_status_select");
  const submitBtn = $("submitBtn");
  const cancelBtn = $("cancelBtn");

  if (employeeIdInput) employeeIdInput.value = payroll.employee_id || "";
  if (employeeNameInput) employeeNameInput.value = payroll.name || "";
  if (salaryStatusSelect) salaryStatusSelect.value = payroll.salary_status || "Pending";

  if (submitBtn) submitBtn.textContent = "Update Payroll";
  if (cancelBtn) cancelBtn.style.display = "inline-block";
}