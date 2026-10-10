const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

export class ApiError extends Error{
    constructor(status,message){
        super(message);
        this.status=status;
    }
}

let onUnauthorized = null;

export const setUnauthorizedHandler = (handler)=> {
    onUnauthorized = handler;
} 

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
        let message = response.statusText;

        const body = await response.json().catch(()=>null);

        if(body?.detail) {
            if(typeof body.detail==='string'){
                message = body.detail;
            } else if (Array.isArray(body.detail)) {
                message = body.detail
                .map(err=> {
                    if (err.field&&err.message) {
                        return `${err.field}: ${err.message}`;
                    }
                    return `${err.loc?.join('.')}:${err.msg}`;
                })
                .join(', ');
            }
        }

        if (response.status===401 && onUnauthorized){
            onUnauthorized();
        }

        throw new ApiError(response.status,message);
    }

    if (response.status ===204) {
        return null;
    }

    return response.json()

};

   