import React, { useState, useEffect } from 'react';
import adminApi from '../../services/adminApi';
import LoadingSpinner from '../common/LoadingSpinner';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        total: 0,
        pages: 0
    });
    // Fetch users
    useEffect(() => {
        fetchUsers();
    }, [pagination.page, search]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const params = {
                page: pagination.page,
                limit: 10,
                ...(search && { search })
            };
            const response = await adminApi.getUsers(params);
            setUsers(response.data);
            setPagination(response.pagination);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };
    //Activate or deactivate or role change
    const handleDeactivate = async (userId) => {
        if (!window.confirm('Are you sure you want to deactivate this user?')) return;
        try {
            await adminApi.deactivateUser(userId);
            fetchUsers();
        } catch (error) {
            alert(error.message || 'Failed to deactivate user');
        }
    };

    const handleActivate = async (userId) => {
        try {
            await adminApi.activateUser(userId);
            fetchUsers();
        } catch (error) {
            alert(error.message || 'Failed to activate user');
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await adminApi.updateUser(userId, { role: newRole });
            fetchUsers();
        } catch (error) {
            alert(error.message || 'Failed to update user role');
        }
    };

    if (loading && users.length === 0) return <LoadingSpinner />;

    return (
        <div className="container">
            <h1 style={{ marginBottom: '30px' }}>Manage Users</h1>
            {/* Search */}
            <input
                type="text"
                placeholder="Search users by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    marginBottom: '20px'
                }}
            />

            <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Username</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Joined</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} style={{ borderTop: '1px solid #dee2e6' }}>
                                <td style={{ padding: '12px' }}><strong>{user.username}</strong></td>
                                <td style={{ padding: '12px' }}>{user.email}</td>
                                <td style={{ padding: '12px' }}>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        style={{ padding: '4px', borderRadius: '4px' }}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{
                                        background: user.isActive ? '#d4edda' : '#f8d7da',
                                        color: user.isActive ? '#155724' : '#721c24',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px'
                                    }}>
                                        {user.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    {user.isActive ? (
                                        <button onClick={() => handleDeactivate(user._id)} className="btn btn-danger" style={{ padding: '4px 8px' }}>
                                            Deactivate
                                        </button>
                                    ) : (
                                        <button onClick={() => handleActivate(user._id)} className="btn btn-success" style={{ padding: '4px 8px' }}>
                                            Activate
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            {pagination.pages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
                    <button onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })} disabled={pagination.page === 1} className="btn">
                        Previous
                    </button>
                    <span style={{ padding: '5px 15px' }}>
                        Page {pagination.page} of {pagination.pages}
                    </span>
                    <button onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })} disabled={pagination.page === pagination.pages} className="btn">
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;