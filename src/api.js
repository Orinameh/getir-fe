const url = process.env.REACT_APP_URL;
export const GET = (endpoint) => {
    return fetch(`${url}${endpoint}`);
};

export const POST = (endpoint, data) => {
    return fetch(`${url}${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
};

export const PUT = (endpoint, data) => {
    return fetch(`${url}${endpoint}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
};

export const DELETE = (endpoint) => {
    return fetch(`${url}${endpoint}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
};
