import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import questionApi from '../../services/questionApi';
import { getUser, isAuthenticated } from '../../services/auth';
import LoadingSpinner from '../common/LoadingSpinner';

const MyQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = getUser();

    //Load users questions
    useEffect(() => {
        if (user && user._id) {
            fetchMyQuestions();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchMyQuestions = async () => {
        try {
            const response = await questionApi.getUserQuestions(user._id);
            setQuestions(response.data || []);
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };
    //Delete question
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this question?')) return;

        try {
            await questionApi.deleteQuestion(id);
            setQuestions(questions.filter(q => q._id !== id));
        } catch (error) {
            alert(error.message || 'Failed to delete question');
        }
    };

    if (loading) return <LoadingSpinner />;
    //If not logged in
    if (!isAuthenticated() || !user) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '50px 20px' }}>
                <h1>My Questions</h1>
                <div className="alert alert-error">
                    <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                        You need to be logged in to view your questions.
                    </p>
                    <Link to="/login" className="btn" style={{ marginRight: '10px' }}>
                        Go to Login
                    </Link>
                    <Link to="/register" className="btn">
                        Register
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>My Questions</h1>
                <Link to="/user/ask" className="btn">+ Ask New Question</Link>
            </div>

            {questions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>📝</div>
                    <h3 style={{ marginBottom: '15px' }}>You haven't asked any questions yet</h3>
                    <Link to="/user/ask" className="btn">Ask Your First Question</Link>
                </div>
            ) : (
                <div>
                    {/* Summary */}
                    <div style={{ background: '#e9ecef', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                        <strong>Total Questions:</strong> {questions.length} |{' '}
                        <strong>Pending:</strong> {questions.filter(q => q.status === 'pending').length} |{' '}
                        <strong>Approved:</strong> {questions.filter(q => q.status === 'approved').length}
                    </div>

                    {questions.map(question => (
                        <div key={question._id} className="card">
                            <Link to={`/questions/${question._id}`} style={{ textDecoration: 'none' }}>
                                <h3 style={{ color: '#007bff', marginBottom: '10px' }}>{question.title}</h3>
                            </Link>

                            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                                <span style={{ background: '#e9ecef', padding: '4px 12px', borderRadius: '20px', fontSize: '13px' }}>
                                    {question.topic}
                                </span>
                                <span style={{
                                    background: question.status === 'approved' ? '#d4edda' :
                                        (question.status === 'pending' ? '#fff3cd' : '#f8d7da'),
                                    color: question.status === 'approved' ? '#155724' :
                                        (question.status === 'pending' ? '#856404' : '#721c24'),
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '13px',
                                    textTransform: 'capitalize'
                                }}>
                                    {question.status}
                                </span>
                            </div>

                            <p style={{ color: '#666', marginBottom: '15px' }}>
                                {question.description.length > 150
                                    ? `${question.description.substring(0, 150)}...`
                                    : question.description}
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                                <div style={{ fontSize: '14px', color: '#888' }}>
                                    views: {question.views || 0} • answers: {question.answers?.length || 0}
                                </div>
                                <div>
                                    <Link to={`/questions/${question._id}`} className="btn" style={{ marginRight: '10px', padding: '5px 15px' }}>
                                        View
                                    </Link>
                                    <button onClick={() => handleDelete(question._id)} className="btn btn-danger" style={{ padding: '5px 15px' }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyQuestions;