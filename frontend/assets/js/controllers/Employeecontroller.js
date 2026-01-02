import { 
    apiGetAll, 
    apiGetOne, 
    apiCreate, 
    apiUpdate, 
    apiDelete 
} from "../services/Employeeservice.js";

import { showAlert } from "../components/Alert.js";
import { renderEmployeetable } from "../components/Employeetable.js";
import { resetForm, fillForm } from "../components/Employeeform.js";

import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Setup event listeners and load initial data
export function initEmployeecontroller() {
  // Start by fetching and displaying data
  loademployees(); // Standardized to plural

  // --- Handle Form Submissions ---
  const form = $("EmployeeForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // FIXED: Added missing comma after department
      const data = {
        name: $("name").value.trim(),
        email: $("email").value.trim(),
        address: $("address").value.trim(),
        department: $("department").value.trim(),
        salary_status: $("salary_status").value.trim()
      };

      const { editingId } = getState();

      editingId
        ? await updateemployee(editingId, data)
        : await createNewemployee(data);
    });
  }

  // --- Handle Cancel Button Click ---
  const cancelBtn = $("cancelBtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      setState({ editingId: null });
      resetForm();
    });
  }
}

// FIXED: Standardized name to plural 'loademployees'
export async function loademployees() {
  const spinner = $("loadingSpinner");
  const table = $("EmployeesTableContainer");

  if (spinner) spinner.style.display = "block";
  if (table) table.style.display = "none";

  const employee = await apiGetAll();

  setState({ employee });
  
  // FIXED: Matches import 'renderEmployeetable'
  renderEmployeetable(employee);

  if (spinner) spinner.style.display = "none";
  if (table) table.style.display = "block";
}

// Create a new employee
export async function createNewemployee(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("Employee added!");
    resetForm();
    loademployees(); // Fixed naming
  }
}

// Load a employee into the form for editing
export async function editemployee(id) {
  const employee = await apiGetOne(id);

  setState({ editingId: id });
  fillForm(employee);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update an existing employee
export async function updateemployee(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetForm();
    setState({ editingId: null });
    loademployees(); // Fixed naming
  }
}

// Delete a employee
export async function deleteemployeeAction(id) {
  if (!confirm("Delete this employee?")) return;

  const res = await apiDelete(id);
  if (res.ok) {
    showAlert("Deleted!");
    loademployees(); // Fixed naming
  }
}