const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

export const apiFetch = async (path,options = {}) => {
    const secret = localStorage.getItem('session-secret')

    const response = await fetch(`${API_URL}${path}`,{
        ...options,
        headers: {
            'Content-Type':'application/json',
            ...(secret? {'session-secret': secret}:{}),
            ...options.headers,
        },
    });

    if(!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail ||response.statusText);
    }

    if (response.status ===204) {
        return null;
    }

    return response.json()

};

   