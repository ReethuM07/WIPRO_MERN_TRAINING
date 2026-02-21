import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import questionApi from '../../services/questionApi';
import adminApi from '../../services/adminApi';
import LoadingSpinner from '../common/LoadingSpinner';

const ManageQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    //Fetch questions when filter changes
    useEffect(() => {
        fetchQuestions();
    }, [filter]);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const params = filter !== 'all' ? { status: filter } : {};
            const response = await adminApi.getAllQuestions(params);
            setQuestions(response.data || []);
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };
    //Approve or reject or delete
    const handleApprove = async (id) => {
        try {
            await questionApi.approveQuestion(id, 'approved');
            fetchQuestions();
        } catch (error) {
            alert('Failed to approve question');
        }
    };

    const handleReject = async (id) => {
        try {
            await questionApi.approveQuestion(id, 'rejected');
            fetchQuestions();
        } catch (error) {
            alert('Failed to reject question');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this question?')) return;
        try {
            await questionApi.deleteQuestion(id);
            fetchQuestions();
        } catch (error) {
            alert('Failed to delete question');
        }
    };

    //Status badge
    const getStatusBadge = (status) => {
        const badges = {
            pending: { color: '#ffc107', text: 'Pending' },
            approved: { color: '#28a745', text: 'Approved' },
            rejected: { color: '#dc3545', text: 'Rejected' },
            resolved: { color: '#17a2b8', text: 'Resolved' }
        };
        const badge = badges[status] || badges.pending;
        return (
            <span style={{ background: badge.color, color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                {badge.text}
            </span>
        );
    };

    if (loading && questions.length === 0) return <LoadingSpinner />;

    return (
        <div className="container">
            <h1 style={{ marginBottom: '30px' }}>Manage Questions</h1>
            {/* Filter */}
            <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginBottom: '20px', padding: '8px' }}>
                <option value="all">All Questions</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="resolved">Resolved</option>
            </select>

            {questions.length === 0 ? (
                <p>No questions found.</p>
            ) : (
                questions.map(q => (
                    <div key={q._id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <h3>{q.title}</h3>
                            {getStatusBadge(q.status)}
                        </div>
                        <p style={{ color: '#666', margin: '10px 0' }}>
                            {q.description.length > 200 ? q.description.substring(0, 200) + '...' : q.description}
                        </p>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <span style={{ background: '#e9ecef', padding: '4px 8px', borderRadius: '4px' }}>{q.topic}</span>
                            <span>By: {q.askedBy?.username}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {q.status === 'pending' && (
                                <>
                                    <button onClick={() => handleApprove(q._id)} className="btn btn-success">Approve</button>
                                    <button onClick={() => handleReject(q._id)} className="btn btn-danger">Reject</button>
                                </>
                            )}
                            <button onClick={() => handleDelete(q._id)} className="btn btn-danger">Delete</button>
                            <Link to={`/questions/${q._id}`} className="btn">View</Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ManageQuestions;