import { $ } from "../utils/dom.js";

// Resets the form to "Create" mode
export function resetForm() {
    const form = $("ProjectForm");
    if (form) form.reset();
    
    const submitBtn = $("submitBtn");
    const cancelBtn = $("cancelBtn");
    
    if (submitBtn) submitBtn.textContent = "Add Project";
    if (cancelBtn) cancelBtn.style.display = "none";
}

// Fills the form with data for "Edit" mode
export function fillForm(project) {
    const nameField = $("name");
    const clientField = $("client");
    const statusField = $("status");
    const descriptionField = $("description");
    
    if (nameField) nameField.value = project.name || "";
    if (clientField) clientField.value = project.client || "";
    if (statusField) statusField.value = project.status || "";
    if (descriptionField) descriptionField.value = project.description || "";
    
    const submitBtn = $("submitBtn");
    const cancelBtn = $("cancelBtn");

    if (submitBtn) submitBtn.textContent = "Update Project";
    if (cancelBtn) cancelBtn.style.display = "inline-block";
}