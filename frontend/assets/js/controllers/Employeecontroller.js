import { 
    apiGetAll, 
    apiGetOne, 
    apiCreate, 
    apiUpdate, 
    apiDelete 
} from "../services/employeeService.js";

import { showAlert } from "../components/Alert.js";
import { renderEmployeetable } from "../components/Employeetable.js";
import { resetForm, fillForm } from "../components/Employeeform.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

// Setup event listeners and load initial data
// Initialize the main logic and set up all necessary event listeners
export function initemployeeController() {
  // Start by fetching and displaying all employee data immediately upon load
  loademployees();

  // --- Handle Form Submissions ---

  // Attach a listener to the 'submit' event of the employee input form
  $("employeeForm").addEventListener("submit", async (e) => {
    // Prevent the browser's default form submission behavior (page refresh)
    e.preventDefault();

    // Collect data from the input fields using the custom '$' selector
    const data = {
      name: $("name").value.trim(),   // Get name value, remove whitespace
      email: $("email").value.trim(), // Get email value
      course: $("course").value.trim(), // Get course value
      year: $("year").value.trim()    // Get year value
    };

    // Check the application state to see if we are currently editing an existing record
    const { editingId } = getState();

    // Use a ternary operator to decide which action to take:
    editingId
      ? await updateemployee(editingId, data) // If editingId exists, update the employee
      : await createNewemployee(data);        // Otherwise, create a new employee
  });

  // --- Handle Cancel Button Click ---

  // Attach a listener to the 'click' event of the cancel button
  $("cancelBtn").addEventListener("click", () => {
    // Clear the editing state (set the ID to null)
    setState({ editingId: null });
    // Clear all input fields in the form
    resetForm();
  });
}


// Fetch all employee data from the API and update the user interface
export async function loademployee() {
  // Get references to the loading spinner and the main data table elements
  const spinner = $("loadingSpinner");
  const table = $("employeesTableContainer");

  // Show the spinner and hide the table to indicate a loading state
  spinner.style.display = "block";
  table.style.display = "none";

  // Asynchronously fetch all employee records from the backend API
  const employees = await apiGetAll();

  // Store the retrieved employee array in the application's global state
  setState({ employee });
  // Render the fetched employee data into the HTML table structure
  renderemployeeTable(employee);

  // Hide the spinner and show the table now that the data is loaded and displayed
  spinner.style.display = "none";
  table.style.display = "block";
}


// Create a new employee
export async function createNewemployee(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("employee added!");
    resetForm();
    loademployees();
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
    loademployees();
  }
}

// Delete a employee
export async function deleteemployeeAction(id) {
  if (!confirm("Delete this employee?")) return;

  const res = await apiDelete(id);
 	if (res.ok) {
    showAlert("Deleted!");
    loademployees();
  }
}