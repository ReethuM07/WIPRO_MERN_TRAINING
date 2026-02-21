import { io } from 'socket.io-client';
import { getToken } from './auth';

let socket;

const chatService = {

    connect: () => {
        if (!socket) {
            socket = io('http://localhost:5000', {
                auth: { token: getToken() }
            });
        }
    },

    sendMessage: (receiverId, message) => {
        socket.emit('private-message', { receiverId, message });
    },

    onMessage: (callback) => {
        socket.on('private-message', callback);
    },

    disconnect: () => {
        if (socket) socket.disconnect();
    }
};

export default chatService;

