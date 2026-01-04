const API_URL = "/api/projects"; 

async function safeJson(res) {
    try {
        return await res.json();
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
    }
}

export async function apiGetAllProjects() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            console.error("Failed to fetch projects:", res.status);
            return [];
        }
        return await safeJson(res) || [];
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

export async function apiGetOneProject(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) {
            console.error("Failed to fetch project:", res.status);
            return null;
        }
        return await safeJson(res);
    } catch (error) {
        console.error("Error fetching project:", error);
        return null;
    }
}

export async function apiCreateProject(data) {
    try {
        return await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
}

export async function apiUpdateProject(id, data) {
    try {
        return await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error("Error updating project:", error);
        throw error;
    }
}

export async function apiDeleteProject(id) {
    try {
        return await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
    }
}