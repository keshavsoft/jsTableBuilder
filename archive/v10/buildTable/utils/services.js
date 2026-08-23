/**
 * Generic service to handle API requests for the TableBuilder.
 */

export async function fetchJson(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        throw error;
    }
}

export const apiActions = {
    read: async (endpoint) => {
        if (!endpoint) return null;

        const data = await fetchJson(endpoint);
        // Handle nested data structures if necessary
        return Array.isArray(data) ? data : (data.tallymessage || data);
    },

    create: async (endpoint, payload) => {
        return fetchJson(endpoint, {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },

    update: async (endpoint, payload) => {
        return fetchJson(endpoint, {
            method: 'PUT',
            body: JSON.stringify(payload)
        });
    },

    delete: async (endpoint, id) => {
        return fetchJson(`${endpoint}/${id}`, {
            method: 'DELETE'
        });
    }
};

export function setupServices(instance, endPoints = {}) {
    instance.endPoints = endPoints;
    instance.services = {};

    try {
        // Bind each API action to its corresponding endpoint if provided
        Object.keys(apiActions).forEach(action => {
            if (endPoints[action]) {
                instance.services[action] = (...args) => apiActions[action](endPoints[action], ...args);
            }
        });
    } catch (error) {
        console.log("eeeeeeeee : ", error);
    };
}
