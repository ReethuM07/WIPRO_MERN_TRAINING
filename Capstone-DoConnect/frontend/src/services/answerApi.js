import request from './api';

const answerApi = {
    createAnswer: (answerData) => {
        return request('/answers', {
            method: 'POST',
            body: JSON.stringify(answerData)
        });
    },

    getAnswersByQuestion: (questionId) => {
        return request(`/answers/question/${questionId}`);
    },

    updateAnswer: (id, content) => {
        return request(`/answers/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ content })
        });
    },

    deleteAnswer: (id) => {
        return request(`/answers/${id}`, {
            method: 'DELETE'
        });
    },

    likeAnswer: (id) => {
        return request(`/answers/${id}/like`, {
            method: 'POST'
        });
    },

    addComment: (answerId, content) => {
        return request(`/answers/${answerId}/comments`, {
            method: 'POST',
            body: JSON.stringify({ content })
        });
    },

    deleteComment: (commentId) => {
        return request(`/answers/comments/${commentId}`, {
            method: 'DELETE'
        });
    },

    approveAnswer: (id, status) => {
        return request(`/answers/${id}/approve`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
    },

    getUserAnswerCount: (userId) => {
        return request(`/answers/user/${userId}/count`);
    }
};

export default answerApi;