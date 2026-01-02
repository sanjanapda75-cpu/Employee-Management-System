import { $ } from "../utils/dom.js";

// Resets the form to "Create" mode
export function resetForm() {
    $("ProjectForm").reset();
    
    const submitBtn = $("submitBtn");
    const cancelBtn = $("cancelBtn");
    
    if (submitBtn) submitBtn.textContent = "Add Project";
    if (cancelBtn) cancelBtn.style.display = "none";
}

// Fills the form with data for "Edit" mode
export function fillForm(project) {
    $("name").value = project.name;
    $("client").value = project.client;
    $("status").value = project.status;
    $("description").value = project.description;
    
    const submitBtn = $("submitBtn");
    const cancelBtn = $("cancelBtn");

    if (submitBtn) submitBtn.textContent = "Update Project";
    if (cancelBtn) cancelBtn.style.display = "inline-block";
}