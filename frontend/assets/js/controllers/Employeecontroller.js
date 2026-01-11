import { 
    apiGetAll, 
    apiGetOne, 
    apiCreate, 
    apiUpdate, 
    apiDelete 
} from "../services/Employeeservice.js";

import { showAlert } from "../components/Alert.js";
import { resetForm, fillForm } from "../components/Employeeform.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Setup event listeners and load initial data
export function initEmployeecontroller() {
    // Start by fetching and displaying data
    loademployees();

    // --- Handle Form Submissions ---
    const form = $("EmployeeForm");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

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
            // Hide cancel button if it was visible
            cancelBtn.classList.add("hidden");
        });
    }
}

// Fetch data AND render the table (Includes Status Logic)
export async function loademployees() {
    const spinner = $("loadingSpinner");
    const tableContainer = $("EmployeesTableContainer");
    const tableBody = $("EmployeeTableBody");
    const countDisplay = $("countDisplay");
    const noDataMsg = $("noemployee");

    // Show loading state
    if (spinner) spinner.style.display = "flex"; // Changed to flex for centering
    if (tableContainer) tableContainer.classList.add("hidden");

    try {
        // Fetch from API (Calls the Python JOIN function)
        const employees = await apiGetAll();
        
        // Update State
        setState({ employees });

        // Update UI
        if (spinner) spinner.style.display = "none";
        
        if (!employees || employees.length === 0) {
            if (noDataMsg) noDataMsg.classList.remove("hidden");
            if (tableContainer) tableContainer.classList.add("hidden");
            if (countDisplay) countDisplay.innerText = "0";
            return;
        }

        // Data Exists -> Render Table
        if (noDataMsg) noDataMsg.classList.add("hidden");
        if (tableContainer) tableContainer.classList.remove("hidden");
        if (countDisplay) countDisplay.innerText = employees.length;

        // Clear old rows
        tableBody.innerHTML = "";

        // Loop through employees and create rows
        employees.forEach(emp => {
            // Determine Color for Status
            let statusColor = "bg-gray-100 text-gray-600"; // Default
            if (emp.status === "Paid") statusColor = "bg-green-100 text-green-700";
            else if (emp.status === "Pending") statusColor = "bg-orange-100 text-orange-700";
            else if (emp.status === "Processing") statusColor = "bg-blue-100 text-blue-700";
            else if (emp.status === "Overdue") statusColor = "bg-red-100 text-red-700";

            const row = document.createElement("tr");
            row.className = "hover:bg-gray-50 border-b border-gray-100 transition-colors";

            row.innerHTML = `
                <td class="px-6 py-4 text-sm text-slate-500">#${emp.id}</td>
                <td class="px-6 py-4">
                    <div class="flex flex-col">
                        <span class="text-sm font-semibold text-slate-800">${emp.name}</span>
                        <span class="text-xs text-slate-500">${emp.email}</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600">${emp.department}</td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold ${statusColor}">
                        ${emp.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <button class="text-blue-600 hover:text-blue-800 mr-3 transition-colors" onclick="window.triggerEdit(${emp.id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="text-red-500 hover:text-red-700 transition-colors" onclick="window.triggerDelete(${emp.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Failed to load employees", error);
        if (spinner) spinner.style.display = "none";
    }
}

// Create a new employee
export async function createNewemployee(data) {
    const res = await apiCreate(data);
    if (res && !res.error) {
        showAlert("Employee added successfully!");
        resetForm();
        loademployees();
    } else {
        showAlert("Failed to add employee", "error");
    }
}

// Load a employee into the form for editing
export async function editemployee(id) {
    const employee = await apiGetOne(id);
    if(employee){
        setState({ editingId: id });
        fillForm(employee);
        
        // Show cancel button
        const cancelBtn = $("cancelBtn");
        if(cancelBtn) cancelBtn.classList.remove("hidden");

        // Scroll to form
        const formContainer = $("EmployeeForm"); 
        if(formContainer) formContainer.scrollIntoView({ behavior: "smooth" });
    }
}

// Update an existing employee
export async function updateemployee(id, data) {
    const res = await apiUpdate(id, data);
    if (res && !res.error) {
        showAlert("Employee updated successfully!");
        resetForm();
        setState({ editingId: null });
        
        // Hide cancel button
        const cancelBtn = $("cancelBtn");
        if(cancelBtn) cancelBtn.classList.add("hidden");

        loademployees();
    } else {
        showAlert("Failed to update employee", "error");
    }
}

// Delete a employee
export async function deleteemployeeAction(id) {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    const res = await apiDelete(id);
    if (res) {
        showAlert("Employee record deleted!");
        loademployees();
    }
}

// --- Expose functions to Window for OnClick events ---
window.triggerEdit = (id) => {
    editemployee(id);
};

window.triggerDelete = (id) => {
    deleteemployeeAction(id);
};