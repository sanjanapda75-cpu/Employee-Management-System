import { $ } from "../utils/dom.js";
import { editProject, deleteProjectAction } from "../controllers/ProjectController.js";

export function renderProjectTable(projects) {
    const body = $("ProjectTableBody");
    const noProjects = $("noProjects");

    body.innerHTML = "";

    if (projects.length === 0) {
        noProjects.style.display = "block";
        return;
    }

    noProjects.style.display = "none";

    projects.forEach(project => {
        const row = document.createElement("tr");
        row.className = "border-b";

        // Status badge color logic
        let statusColor = "bg-gray-100 text-gray-800";
        if (project.status === "In Progress") statusColor = "bg-green-100 text-green-800";
        if (project.status === "Planning") statusColor = "bg-yellow-100 text-yellow-800";

        row.innerHTML = `
            <td class="px-3 py-2">${project.id}</td>
            <td class="px-3 py-2 font-medium">${project.name}</td>
            <td class="px-3 py-2">${project.client}</td>
            <td class="px-3 py-2"><span class="text-xs px-2 py-1 rounded ${statusColor}">${project.status}</span></td>
            <td class="px-3 py-2 truncate max-w-xs">${project.description}</td>
            <td class="px-3 py-2 flex space-x-2">
                <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded" data-edit="${project.id}">Edit</button>
                <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded" data-delete="${project.id}">Delete</button>
            </td>
        `;

        row.querySelector("[data-edit]").onclick = () => editProject(project.id);
        row.querySelector("[data-delete]").onclick = () => deleteProjectAction(project.id);

        body.appendChild(row);
    });
}