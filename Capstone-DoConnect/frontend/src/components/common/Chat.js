import React, { useEffect, useState } from 'react';
import chatApi from '../../services/chatApi';
import chatService from '../../services/chatService';
import { getUser } from '../../services/auth';

const Chat = ({ isOpen, onClose }) => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const currentUser = getUser();

    //Load users and connect socket
    useEffect(() => {
        if (!isOpen) return;

        chatApi.getUsers().then(res => {
            setUsers(Array.isArray(res) ? res : []);
        });

        chatService.connect();

        chatService.onMessage((msg) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => {
            chatService.disconnect();
        };

    }, [isOpen]);

    //Load chat history
    useEffect(() => {
        if (!selectedUser) return;

        chatApi.getHistory(selectedUser._id)
            .then(res => {
                setMessages(Array.isArray(res) ? res : []);
            });

    }, [selectedUser]);

    //Send message
    const sendMessage = (e) => {
        e.preventDefault();

        if (!newMessage.trim() || !selectedUser) return;

        chatService.sendMessage(selectedUser._id, newMessage);
        setNewMessage('');
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '350px',
            height: '450px',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000
        }}>
            {/* Header */}
            <div style={{
                background: '#007bff',
                color: 'white',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <span>Chat</span>
                <button
                    onClick={onClose}
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                    ✖
                </button>
            </div>

            {/* Users */}
            <div style={{
                borderBottom: '1px solid #ddd',
                padding: '5px',
                overflowX: 'auto',
                whiteSpace: 'nowrap'
            }}>
                {users.length === 0 ? (
                    <span style={{ fontSize: '12px' }}>No users</span>
                ) : (
                    users.map(user => (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            style={{
                                marginRight: '5px',
                                padding: '5px 10px',
                                cursor: 'pointer'
                            }}
                        >
                            {user.username}
                        </button>
                    ))
                )}
            </div>
            
            {/* Messages */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '10px'
            }}>
                {messages.length === 0 ? (
                    <div style={{ fontSize: '12px' }}>No messages</div>
                ) : (
                    messages.map(msg => {
                        const isOwn =
                            msg.sender &&
                            (msg.sender._id === currentUser._id || msg.sender === currentUser._id);

                        return (
                            <div
                                key={msg._id}
                                style={{
                                    textAlign: isOwn ? 'right' : 'left',
                                    marginBottom: '5px'
                                }}
                            >
                                {msg.message}
                            </div>
                        );
                    })
                )}
            </div>
            
            {/* Input */}
            {selectedUser && (
                <form onSubmit={sendMessage} style={{ padding: '5px', display: 'flex' }}>
                    <input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <button type="submit">Send</button>
                </form>
            )}
        </div>
    );
};

export default Chat;





