import { 
    apiGetAllProjects, 
    apiGetOneProject, 
    apiCreateProject, 
    apiUpdateProject, 
    apiDeleteProject 
} from "../services/ProjectService.js";
import { showAlert } from "../components/Alert.js";
import { renderProjectTable } from "../components/ProjectTable.js";
import { resetForm, fillForm } from "../components/Projectform.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

export function initProjectController() {
    console.log("✓ Project controller initialized");
    
    loadProjects();

    const form = $("ProjectForm");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const data = {
                name: $("name").value.trim(),
                client: $("client").value.trim(),
                status: $("status").value.trim(),
                description: $("description").value.trim()
            };

            console.log("Form submitted with data:", data);

            const { editingId } = getState();
            
            if (editingId) {
                await updateProject(editingId, data);
            } else {
                await createNewProject(data);
            }
        });
    } else {
        console.error("ProjectForm not found!");
    }

    const cancelBtn = $("cancelBtn");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            setState({ editingId: null });
            resetForm();
        });
    }
}

export async function loadProjects() {
    const spinner = $("loadingSpinner");
    const table = $("ProjectsTableContainer");

    if (table) table.style.display = "none";
    if (spinner) spinner.style.display = "block";

    const projects = await apiGetAllProjects();
    console.log("Loaded projects:", projects);
    
    // Pass the callback functions to renderProjectTable
    renderProjectTable(projects, editProject, deleteProjectAction);

    if (spinner) spinner.style.display = "none";
    if (table) table.style.display = "block";
}

export async function createNewProject(data) {
    try {
        const res = await apiCreateProject(data);
        if (res.ok) {
            const newProject = await res.json();
            console.log("Project created:", newProject);
            showAlert("Project added successfully!");
            resetForm();
            loadProjects();
        } else {
            const errorText = await res.text();
            console.error("Failed to create project:", errorText);
            showAlert("Failed to create project", "error");
        }
    } catch (error) {
        console.error("Error in createNewProject:", error);
        showAlert("Error creating project", "error");
    }
}

export async function editProject(id) {
    const project = await apiGetOneProject(id);
    if (project) {
        setState({ editingId: id });
        fillForm(project);
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        showAlert("Project not found", "error");
    }
}

export async function updateProject(id, data) {
    try {
        const res = await apiUpdateProject(id, data);
        if (res.ok) {
            const updatedProject = await res.json();
            console.log("Project updated:", updatedProject);
            showAlert("Project updated successfully!");
            resetForm();
            setState({ editingId: null });
            loadProjects();
        } else {
            const errorText = await res.text();
            console.error("Failed to update project:", errorText);
            showAlert("Failed to update project", "error");
        }
    } catch (error) {
        console.error("Error in updateProject:", error);
        showAlert("Error updating project", "error");
    }
}

export async function deleteProjectAction(id) {
    if (confirm("Are you sure you want to delete this project?")) {
        try {
            const res = await apiDeleteProject(id);
            if (res.ok) {
                console.log("Project deleted:", id);
                showAlert("Project deleted successfully!");
                loadProjects();
            } else {
                const errorText = await res.text();
                console.error("Failed to delete project:", errorText);
                showAlert("Failed to delete project", "error");
            }
        } catch (error) {
            console.error("Error in deleteProjectAction:", error);
            showAlert("Error deleting project", "error");
        }
    }
}