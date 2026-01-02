const API_URL = "/api/projects"; 

async function safeJson(res) {
    try {
        return await res.json();
    } catch {
        return null;
    }
}

export async function apiGetAllProjects() {
    const res = await fetch(API_URL);
    if (!res.ok) return [];
    return safeJson(res);
}

export async function apiGetOneProject(id) {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) return null;
    return safeJson(res);
}

export function apiCreateProject(data) {
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

export function apiUpdateProject(id, data) {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

export function apiDeleteProject(id) {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
}