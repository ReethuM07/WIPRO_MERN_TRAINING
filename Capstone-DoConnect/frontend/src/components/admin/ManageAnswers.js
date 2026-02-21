import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import answerApi from '../../services/answerApi';
import adminApi from '../../services/adminApi';
import LoadingSpinner from '../common/LoadingSpinner';

const ManageAnswers = () => {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    //Fetch answers when filter changes
    useEffect(() => {
        fetchAnswers();
    }, [filter]);

    const fetchAnswers = async () => {
        setLoading(true);
        try {
            const params = {};
            if (filter !== 'all') {
                params.status = filter;
            }
            
            const response = await adminApi.getAllAnswers(params);
            setAnswers(response.data || []);
        } catch (error) {
            console.error('Error fetching answers:', error);
        } finally {
            setLoading(false);
        }
    };

    //Approve or reject or delete
    const handleApprove = async (id) => {
        try {
            await answerApi.approveAnswer(id, 'approved');
            fetchAnswers();
        } catch (error) {
            alert('Failed to approve answer');
        }
    };

    const handleReject = async (id) => {
        try {
            await answerApi.approveAnswer(id, 'rejected');
            fetchAnswers();
        } catch (error) {
            alert('Failed to reject answer');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this answer?')) return;
        try {
            await answerApi.deleteAnswer(id);
            fetchAnswers();
        } catch (error) {
            alert('Failed to delete answer');
        }
    };

    //Status badge
    const getStatusBadge = (status) => {
        const badges = {
            pending: { color: '#ffc107', text: 'Pending' },
            approved: { color: '#28a745', text: 'Approved' },
            rejected: { color: '#dc3545', text: 'Rejected' }
        };
        const badge = badges[status] || badges.pending;
        return (
            <span style={{ background: badge.color, color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                {badge.text}
            </span>
        );
    };

    if (loading && answers.length === 0) return <LoadingSpinner />;

    return (
        <div className="container">
            <h1 style={{ marginBottom: '30px' }}>Manage Answers</h1>
            {/* Filter */}
            <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginBottom: '20px', padding: '8px' }}>
                <option value="all">All Answers</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>

            {answers.length === 0 ? (
                <p>No answers found.</p>
            ) : (
                answers.map(answer => (
                    <div key={answer._id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                                <h3 style={{ margin: 0 }}>
                                    <Link to={`/questions/${answer.questionId?._id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                                        {answer.questionId?.title || 'View Question'}
                                    </Link>
                                </h3>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                                    {answer.questionId?.topic && (
                                        <span style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                            {answer.questionId.topic}
                                        </span>
                                    )}
                                    <span style={{ fontSize: '12px', color: '#666' }}>
                                        By: {answer.answeredBy?.username}
                                    </span>
                                </div>
                            </div>
                            {getStatusBadge(answer.status)}
                        </div>

                        <p style={{ color: '#666', margin: '10px 0', whiteSpace: 'pre-wrap' }}>
                            {answer.content.length > 200 ? answer.content.substring(0, 200) + '...' : answer.content}
                        </p>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <span>👍 {answer.likesCount || 0} likes</span>
                            <span>💬 {answer.comments?.length || 0} comments</span>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            {answer.status === 'pending' && (
                                <>
                                    <button onClick={() => handleApprove(answer._id)} className="btn btn-success">Approve</button>
                                    <button onClick={() => handleReject(answer._id)} className="btn btn-danger">Reject</button>
                                </>
                            )}
                            <button onClick={() => handleDelete(answer._id)} className="btn btn-danger">Delete</button>
                            <Link to={`/questions/${answer.questionId?._id}`} className="btn">View</Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ManageAnswers;