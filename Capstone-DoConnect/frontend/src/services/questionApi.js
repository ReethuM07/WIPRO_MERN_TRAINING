import request from './api';

const questionApi = {
    createQuestion: (questionData) => {
        return request('/questions', {
            method: 'POST',
            body: JSON.stringify(questionData)
        });
    },

    getQuestions: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return request(`/questions?${queryParams}`);
    },

    getQuestionById: (id) => {
        return request(`/questions/${id}`);
    },

    updateQuestion: (id, questionData) => {
        return request(`/questions/${id}`, {
            method: 'PUT',
            body: JSON.stringify(questionData)
        });
    },

    deleteQuestion: (id) => {
        return request(`/questions/${id}`, {
            method: 'DELETE'
        });
    },

    getUserQuestions: (userId) => {
        return request(`/questions/user/${userId}`);
    },

    approveQuestion: (id, status) => {
        return request(`/questions/${id}/approve`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
    },

    resolveQuestion: (id) => {
        return request(`/questions/${id}/resolve`, {
            method: 'PUT'
        });
    }
};

export default questionApi;