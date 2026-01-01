const API_URL = `${window.ENV.API_BASE_URL}/payroll`;

export async function apiGetAllPayroll() {
    const res = await fetch(API_URL);
    return res.ok ? await res.json() : [];
}

export async function apiCreatePayroll(data) {
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

export async function apiDeletePayroll(id) {
    return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}