import request from './api';

const chatApi = {
    getUsers: () => request('/chat/users'),
    getHistory: (userId) => request(`/chat/history/${userId}`)
};

export default chatApi;


