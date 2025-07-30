const isTokenExpired = (token) => {
    if (!token) return true;
    
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    return payload.exp < currentTime;
}


const secureFetch = async (url, options = {}) => {
    const token = localStorage.getItem('access_token');

    if (!token) {
        alert('No session found. Please log in.');
        window.location.href = '/agent/login';
        return;
    }

    // Check if token is expired
    if (isTokenExpired(token)) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return;
    }

    const headers = {
        // merges any additional headers provided in options
        ...options.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(url, options);

    if (!response.status === 401) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        window.location.href = "/agent/login";
    }

    return response.json();
}





export { isTokenExpired, secureFetch };
