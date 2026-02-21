import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeUser, isAuthenticated, isAdmin } from '../../services/auth';
import Chat from './Chat';

const Header = () => {
    const navigate = useNavigate();
    const user = getUser();
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleLogout = () => {
        removeUser();
        navigate('/login');
    };

    return (
        <>
            <header className="header">
                <div className="header-content">
                    <Link to="/" className="logo">
                        DoConnect
                    </Link>

                    <nav className="nav-links">
                        {isAuthenticated() ? (
                            <>
                                {isAdmin() ? (
                                    <>
                                        <Link to="/admin/dashboard">Dashboard</Link>
                                        <Link to="/admin/users">Manage Users</Link>
                                        <Link to="/admin/questions">Manage Questions</Link>
                                        <Link to="/admin/answers">Manage Answers</Link>
                                        <Link to="/admin/questions/pending">Pending</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/user/dashboard">Dashboard</Link>
                                        <Link to="/user/ask">Ask Question</Link>
                                        <Link to="/user/questions">My Questions</Link>
                                        <Link to="/questions">Browse Questions</Link>

                                        <button
                                            onClick={() => setIsChatOpen(true)}
                                            style={{
                                                backgroundColor: '#28a745',
                                                color: 'white',
                                                border: 'none',
                                                padding: '5px 15px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}
                                        >
                                            Chat
                                        </button>
                                    </>
                                )}

                                <span style={{ color: '#666' }}>
                                    Welcome, {user?.username}
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className="btn btn-danger"
                                    style={{ padding: '5px 15px' }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                                <Link to="/questions">Browse Questions</Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </>
    );
};

export default Header;
