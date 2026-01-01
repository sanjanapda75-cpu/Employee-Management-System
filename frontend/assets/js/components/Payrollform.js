import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new payroll record
export function resetForm() {
  // Use the native .reset() method on the HTML form element for Payroll
  $("PayrollForm").reset();

  // Change the submit button text back to "Add Payroll"
  $("submitBtn").textContent = "Add Payroll";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected payroll object (for editing)
export function fillForm(payroll) {
  // Fill each input field with the corresponding property from the payroll data
  // Using IDs that match your payroll.html structure
  $("employee_id_input").value = payroll.employee_id;
  $("employee_name_input").value = payroll.name;
  $("salary_status_select").value = payroll.salary_status;

  // Change the submit button text to "Update Payroll"
  $("submitBtn").textContent = "Update Payroll";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "inline-block";
}