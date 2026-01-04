import { $ } from "../utils/dom.js";

export function renderProjectTable(projects, editCallback, deleteCallback) {
    const body = $("ProjectTableBody");
    const noProjects = $("noProjects");

    if (!body) {
        console.error("ProjectTableBody not found!");
        return;
    }

    body.innerHTML = "";

    if (!projects || projects.length === 0) {
        if (noProjects) noProjects.style.display = "block";
        return;
    }

    if (noProjects) noProjects.style.display = "none";

    projects.forEach(project => {
        const row = document.createElement("tr");
        row.className = "border-b hover:bg-gray-50";

        // Status badge color logic
        let statusColor = "bg-gray-100 text-gray-800";
        if (project.status === "In Progress") statusColor = "bg-green-100 text-green-800";
        if (project.status === "Planning") statusColor = "bg-yellow-100 text-yellow-800";
        if (project.status === "Completed") statusColor = "bg-blue-100 text-blue-800";

        row.innerHTML = `
            <td class="px-3 py-2">${project.id}</td>
            <td class="px-3 py-2 font-medium">${escapeHtml(project.name)}</td>
            <td class="px-3 py-2">${escapeHtml(project.client)}</td>
            <td class="px-3 py-2">
                <span class="text-xs px-2 py-1 rounded ${statusColor}">
                    ${escapeHtml(project.status)}
                </span>
            </td>
            <td class="px-3 py-2 truncate max-w-xs">${escapeHtml(project.description || "")}</td>
            <td class="px-3 py-2 flex space-x-2">
                <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded" data-edit="${project.id}">
                    Edit
                </button>
                <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded" data-delete="${project.id}">
                    Delete
                </button>
            </td>
        `;

        const editBtn = row.querySelector("[data-edit]");
        const deleteBtn = row.querySelector("[data-delete]");
        
        // Use the callback functions passed as parameters
        if (editBtn && editCallback) editBtn.onclick = () => editCallback(project.id);
        if (deleteBtn && deleteCallback) deleteBtn.onclick = () => deleteCallback(project.id);

        body.appendChild(row);
    });
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}