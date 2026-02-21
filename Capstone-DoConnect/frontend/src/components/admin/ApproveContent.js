import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '../../services/adminApi';
import questionApi from '../../services/questionApi';
import answerApi from '../../services/answerApi';
import LoadingSpinner from '../common/LoadingSpinner';

const ApproveContent = () => {
    const [activeTab, setActiveTab] = useState('questions');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);

    //Fetch pending questions, pending answers
    useEffect(() => {
        if (activeTab === 'questions') {
            fetchPendingQuestions();
        } else {
            fetchPendingAnswers();
        }
    }, [activeTab]);

    const fetchPendingQuestions = async () => {
        setLoading(true);
        try {
            const response = await adminApi.getPendingQuestions();
            setQuestions(response.data || []);
        } catch (error) {
            console.error('Error fetching pending questions:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPendingAnswers = async () => {
        setLoading(true);
        try {
            const response = await adminApi.getPendingAnswers();
            setAnswers(response.data || []);
        } catch (error) {
            console.error('Error fetching pending answers:', error);
        } finally {
            setLoading(false);
        }
    };

    //Approve or reject question
    const handleApproveQuestion = async (questionId) => {
        try {
            await questionApi.approveQuestion(questionId, 'approved');
            setQuestions(questions.filter(q => q._id !== questionId));
        } catch (error) {
            alert(error.message || 'Failed to approve question');
        }
    };

    const handleRejectQuestion = async (questionId) => {
        if (!window.confirm('Are you sure you want to reject this question?')) return;
        try {
            await questionApi.approveQuestion(questionId, 'rejected');
            setQuestions(questions.filter(q => q._id !== questionId));
        } catch (error) {
            alert(error.message || 'Failed to reject question');
        }
    };

    //Approve or reject answers
    const handleApproveAnswer = async (answerId) => {
        try {
            await answerApi.approveAnswer(answerId, 'approved');
            setAnswers(answers.filter(a => a._id !== answerId));
        } catch (error) {
            alert(error.message || 'Failed to approve answer');
        }
    };

    const handleRejectAnswer = async (answerId) => {
        if (!window.confirm('Are you sure you want to reject this answer?')) return;
        try {
            await answerApi.approveAnswer(answerId, 'rejected');
            setAnswers(answers.filter(a => a._id !== answerId));
        } catch (error) {
            alert(error.message || 'Failed to reject answer');
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="container">
            <h1 style={{ marginBottom: '30px' }}>Approve Content</h1>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '2px solid #dee2e6', paddingBottom: '10px' }}>
                <button
                    onClick={() => setActiveTab('questions')}
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        borderBottom: activeTab === 'questions' ? '3px solid #007bff' : 'none',
                        fontWeight: activeTab === 'questions' ? 'bold' : 'normal',
                        color: activeTab === 'questions' ? '#007bff' : '#666'
                    }}
                >
                    Questions ({questions.length})
                </button>
                <button
                    onClick={() => setActiveTab('answers')}
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        borderBottom: activeTab === 'answers' ? '3px solid #007bff' : 'none',
                        fontWeight: activeTab === 'answers' ? 'bold' : 'normal',
                        color: activeTab === 'answers' ? '#007bff' : '#666'
                    }}
                >
                    Answers ({answers.length})
                </button>
            </div>

            {activeTab === 'questions' && (
                <div>
                    {questions.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8f9fa', borderRadius: '8px' }}>
                            <h3>No Pending Questions</h3>
                        </div>
                    ) : (
                        questions.map(question => (
                            <div key={question._id} className="card">
                                <h3>{question.title}</h3>
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                    <span style={{ background: '#e9ecef', padding: '4px 8px', borderRadius: '4px' }}>
                                        {question.topic}
                                    </span>
                                    <span>By: {question.askedBy?.username}</span>
                                </div>
                                <p style={{ background: '#f8f9fa', padding: '15px', borderRadius: '4px', margin: '15px 0' }}>
                                    {question.description}
                                </p>
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                    <Link to={`/questions/${question._id}`} className="btn">View</Link>
                                    <button onClick={() => handleApproveQuestion(question._id)} className="btn btn-success">Approve</button>
                                    <button onClick={() => handleRejectQuestion(question._id)} className="btn btn-danger">Reject</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === 'answers' && (
                <div>
                    {answers.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8f9fa', borderRadius: '8px' }}>
                            <h3>No Pending Answers</h3>
                        </div>
                    ) : (
                        answers.map(answer => (
                            <div key={answer._id} className="card">
                                <div style={{ background: '#e9ecef', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                                    <Link to={`/questions/${answer.questionId?._id}`}>
                                        Question: {answer.questionId?.title || 'View Question'}
                                    </Link>
                                </div>
                                <p style={{ background: '#f8f9fa', padding: '15px', borderRadius: '4px', marginBottom: '15px' }}>
                                    {answer.content}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>By: {answer.answeredBy?.username}</span>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button onClick={() => handleApproveAnswer(answer._id)} className="btn btn-success">Approve</button>
                                        <button onClick={() => handleRejectAnswer(answer._id)} className="btn btn-danger">Reject</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ApproveContent;