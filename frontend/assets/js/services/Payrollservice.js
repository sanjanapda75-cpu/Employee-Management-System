const API_URL = `${window.ENV.API_BASE_URL}/payroll`;

async function safeJson(res) {
    try {
        return await res.json();
    } catch (_) {
        return null;
    }
}

export async function apiGetAll() {
    try {
        const res = await fetch(API_URL);
        console.log(res);
        if (!res.ok) return [];
        return safeJson(res);
    } catch (error) {
        console.error("Error in Getting all payroll", error);
        return [];
    }
}

export async function apiGetOne(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) return null;
        return safeJson(res);
    } catch (error) {
        console.error(`Error in getting payroll ${id}`, error);
        return null;
    }
}

// FIXED: Added async/await
export async function apiCreate(data) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return res;
    } catch (error) {
        console.error("Error in creating payroll", error);
        return null;
    }
}

// FIXED: Added async/await
export async function apiUpdate(id, data) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return res;
    } catch (error) {
        console.error("Error in updating payroll:", error);
        return null;
    }
}

// FIXED: Added async/await
export async function apiDelete(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, { 
            method: "DELETE" 
        });
        return res;
    } catch (error) {
        console.error("Error in deleting payroll:", error);
        return null;
    }
}