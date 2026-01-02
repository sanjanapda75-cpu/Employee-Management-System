import { 
    apiGetAllProjects, 
    apiGetOneProject, 
    apiCreateProject, 
    apiUpdateProject, 
    apiDeleteProject 
} from "../services/ProjectService.js";
import { showAlert } from "../components/Alert.js";
import { renderProjectTable } from "../components/ProjectTable.js";
import { resetForm, fillForm } from "../components/ProjectForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

export function initProjectController() {
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

            const { editingId } = getState();
            
            editingId 
                ? await updateProject(editingId, data) 
                : await createNewProject(data);
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

export async function loadProjects() {
    const spinner = $("loadingSpinner");
    const table = $("ProjectsTableContainer");

    if (table) table.style.display = "none";
    if (spinner) spinner.style.display = "block";

    const projects = await apiGetAllProjects();
    renderProjectTable(projects);

    if (spinner) spinner.style.display = "none";
    if (table) table.style.display = "block";
}

export async function createNewProject(data) {
    const res = await apiCreateProject(data);
    if (res.ok) {
        showAlert("Project added!");
        resetForm();
        loadProjects();
    }
}

export async function editProject(id) {
    const project = await apiGetOneProject(id);
    if (project) {
        setState({ editingId: id });
        fillForm(project);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

export async function updateProject(id, data) {
    const res = await apiUpdateProject(id, data);
    if (res.ok) {
        showAlert("Project updated!");
        resetForm();
        setState({ editingId: null });
        loadProjects();
    }
}

export async function deleteProjectAction(id) {
    if (confirm("Delete this project?")) {
        const res = await apiDeleteProject(id);
        if (res.ok) {
            showAlert("Project deleted!");
            loadProjects();
        }
    }
}