const API_URL = 'http://localhost:5000/api';

const getToken = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user).token : null;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};
const request = async (endpoint, options = {}) => {
    const token = getToken();
    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        }
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const authAPI = {
    register: (userData) => request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    }),

    login: (credentials) => request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    }),

    logout: () => request('/auth/logout', {
        method: 'POST'
    })
};

export default request;