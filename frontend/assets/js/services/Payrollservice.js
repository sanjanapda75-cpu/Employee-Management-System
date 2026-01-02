// frontend/assets/js/services/Payrollservice.js
const API_URL = `${window.ENV.API_BASE_URL}/payroll`;

export async function apiGetAllPayroll() {
    const res = await fetch(API_URL);
    // If successful, returns the list of payroll records [cite: 1141, 1178]
    return res.ok ? await res.json() : [];
}

export async function apiCreatePayroll(data) {
    // Sends a POST request to the backend payroll endpoint [cite: 1216, 1271]
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

export async function apiDeletePayroll(id) {
    // Sends a DELETE request using the specific record ID [cite: 1294]
    return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}