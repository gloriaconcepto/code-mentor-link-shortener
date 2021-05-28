export const apiCall = async (method, url, token, body) => {
    let headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    let requestBody = {
        method: method,
        headers,
        body: body ? JSON.stringify(body) : null,
    };
    return fetch(url, requestBody).then((res) => res.json());
};
