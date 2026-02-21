import request from './api';

const adminApi = {
    getUsers: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return request(`/admin/users?${queryParams}`);
    },

    getUserById: (id) => {
        return request(`/admin/users/${id}`);
    },

    updateUser: (id, userData) => {
        return request(`/admin/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    },

    deactivateUser: (id) => {
        return request(`/admin/users/${id}`, {
            method: 'DELETE'
        });
    },

    activateUser: (id) => {
        return request(`/admin/users/${id}/activate`, {
            method: 'PUT'
        });
    },

    getPendingQuestions: () => {
        return request('/admin/questions/pending');
    },

    getPendingAnswers: () => {
        return request('/admin/answers/pending');
    },

    getAllAnswers: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return request(`/admin/answers?${queryParams}`);
    },
    getAllQuestions: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return request(`/admin/questions?${queryParams}`);
    },

    getDashboardStats: () => {
        return request('/admin/stats');
    }
};

export default adminApi;