const API = import.meta.env.VITE_API_URL;

const handleError = async (res, fallback) => {
    const errorData = await res.json().catch(() => ({}))
    const error = new Error(errorData.detail || errorData.message || fallback)
    Object.assign(error, errorData)
    throw error
}

export const getRequest = async (endpoint, token = null) => {
    try {
        const res = await fetch(`${API}${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` })
            }
        });

        if (!res.ok) await handleError(res, "Request failed")

        return await res.json();

    } catch (error) {
        console.error("GET REQUEST ERROR:", error);
        throw error;
    }
};

export const postRequest = async (endpoint, data = {}, token = null, isForm = false) => {
    try {
        const headers = {
            ...(token && { Authorization: `Bearer ${token}` })
        };

        if (!isForm) {
            headers["Content-Type"] = "application/json";
        }

        const res = await fetch(`${API}${endpoint}`, {
            method: "POST",
            headers,
            credentials: "include",
            body: isForm ? data : JSON.stringify(data)
        });

        if (!res.ok) await handleError(res, "Request failed")

        return await res.json();

    } catch (error) {
        console.error("POST REQUEST ERROR:", error);
        throw error;
    }
};

export const putRequest = async (endpoint, data = {}, token = null, isForm = false) => {
    try {
        const headers = {
            ...(token && { Authorization: `Bearer ${token}` })
        };

        if (!isForm) {
            headers["Content-Type"] = "application/json";
        }

        const res = await fetch(`${API}${endpoint}`, {
            method: "PUT",
            headers,
            body: isForm ? data : JSON.stringify(data)
        });

        if (!res.ok) await handleError(res, "Update failed")

        return await res.json();

    } catch (error) {
        console.error("PUT REQUEST ERROR:", error);
        throw error;
    }
};

export const patchRequest = async (endpoint, data = {}, token = null, isForm = false) => {
    try {
        const headers = {
            ...(token && { Authorization: `Bearer ${token}` })
        };

        if (!isForm) {
            headers["Content-Type"] = "application/json";
        }

        const res = await fetch(`${API}${endpoint}`, {
            method: "PATCH",
            headers,
            body: isForm ? data : JSON.stringify(data)
        });

        if (!res.ok) await handleError(res, "Update failed")

        return await res.json();

    } catch (error) {
        console.error("PATCH REQUEST ERROR:", error);
        throw error;
    }
};

export const deleteRequest = async (endpoint, token = null) => {
    try {
        const headers = {
            ...(token && { Authorization: `Bearer ${token}` })
        };

        const res = await fetch(`${API}${endpoint}`, {
            method: "DELETE",
            headers,
            credentials: "include",
        });

        if (res.status === 204) return true

        if (!res.ok) await handleError(res, "Delete failed")

        return await res.json().catch(() => null)

    } catch (error) {
        console.error("DELETE REQUEST ERROR:", error);
        throw error;
    }
};