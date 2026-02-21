import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '../../services/adminApi';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    //Fetch stats on load
    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await adminApi.getDashboardStats();
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    //Reusable stat card
    const StatCard = ({ title, value, icon, color, link }) => (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>{icon}</div>
                <h3 style={{ color: '#333', marginBottom: '10px' }}>{title}</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color }}>{value}</p>
            </div>
        </Link>
    );

    return (
        <div className="container">
            <h1 style={{ marginBottom: '30px' }}>Admin Dashboard</h1>

            <div className="grid">
                <StatCard
                    title="Total Users"
                    value={stats?.users?.total || 0}

                    color="#007bff"
                    link="/admin/users"
                />
                <StatCard
                    title="Active Users"
                    value={stats?.users?.active || 0}

                    color="#28a745"
                    link="/admin/users"
                />
                <StatCard
                    title="Total Questions"
                    value={stats?.questions?.total || 0}

                    color="#17a2b8"
                    link="/admin/questions"
                />
                <StatCard
                    title="Pending Questions"
                    value={stats?.questions?.pending || 0}

                    color="#ffc107"
                    link="/admin/questions/pending"
                />
                <StatCard
                    title="Total Answers"
                    value={stats?.answers?.total || 0}

                    color="#6c757d"
                    link="/admin/answers"
                />
                <StatCard
                    title="Pending Answers"
                    value={stats?.answers?.pending || 0}

                    color="#ffc107"
                    link="/admin/answers/pending"
                />
            </div>

            <h2 style={{ marginBottom: '20px' }}>Quick Actions</h2>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <Link to="/admin/questions/pending" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ background: '#fff3cd' }}>
                        <h3 style={{ color: '#856404' }}>Review Pending Questions</h3>
                        <p>{stats?.questions?.pending || 0} waiting</p>
                    </div>
                </Link>

                <Link to="/admin/answers/pending" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ background: '#d4edda' }}>
                        <h3 style={{ color: '#155724' }}>Review Pending Answers</h3>
                        <p>{stats?.answers?.pending || 0} waiting</p>
                    </div>
                </Link>

                <Link to="/admin/users" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ background: '#cce5ff' }}>
                        <h3 style={{ color: '#004085' }}>Manage Users</h3>
                        <p>{stats?.users?.total || 0} registered</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;