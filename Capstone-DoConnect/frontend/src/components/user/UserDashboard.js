import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/auth';
import questionApi from '../../services/questionApi';
import LoadingSpinner from '../common/LoadingSpinner';
import answerApi from '../../services/answerApi';

const UserDashboard = () => {
    const [user] = useState(getUser());
    const [recentQuestions, setRecentQuestions] = useState([]);
    const [stats, setStats] = useState({
        totalQuestions: 0,
        pendingQuestions: 0,
        totalAnswers: 0
    });
    const [loading, setLoading] = useState(true);

    //Fetch user dashboard data
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await questionApi.getUserQuestions(user._id);
            const questions = response.data || [];

            const answerCountRes = await answerApi.getUserAnswerCount(user._id);
            const answersGiven = answerCountRes.data?.count || 0;

            setRecentQuestions(questions.slice(0, 5));
            setStats({
                totalQuestions: questions.length,
                pendingQuestions: questions.filter(q => q.status === 'pending').length,
                totalAnswers: answersGiven
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="container">
            {/* Welcome Section */}
            <div className="card" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '40px',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                    Welcome back, {user?.username}!
                </h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                    Ready to learn and share knowledge today?
                </p>
            </div>

            {/* Stats */}
            <div className="grid">
                <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <h3>Total Questions</h3>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>
                        {stats.totalQuestions}
                    </p>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <h3>Pending Approval</h3>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffc107' }}>
                        {stats.pendingQuestions}
                    </p>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <h3>Answers Given</h3>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>
                        {stats.totalAnswers}
                    </p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <Link to="/user/ask" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        minHeight: '120px'
                    }}>
                        <h3>Ask Question</h3>
                    </div>
                </Link>

                <Link to="/questions" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{
                        backgroundColor: '#17a2b8',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        minHeight: '120px'
                    }}>
                        <h3>Browse Questions</h3>
                    </div>
                </Link>

                <Link to="/user/questions" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{
                        backgroundColor: '#ffc107',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        minHeight: '120px'
                    }}>
                        <h3>My Questions</h3>
                    </div>
                </Link>
            </div>
            
            {/* Recent Questions */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Recent Questions</h2>
                    <Link to="/user/questions">View All →</Link>
                </div>

                {recentQuestions.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                        You haven't asked any questions yet.
                    </p>
                ) : (
                    recentQuestions.map(question => (
                        <div key={question._id} style={{
                            padding: '15px',
                            borderBottom: '1px solid #eee',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <Link to={`/questions/${question._id}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                                    {question.title}
                                </Link>
                                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                                    {question.topic} • {question.answers?.length || 0} answers
                                </div>
                            </div>
                            <span style={{
                                backgroundColor: question.status === 'approved' ? '#d4edda' : '#fff3cd',
                                color: question.status === 'approved' ? '#155724' : '#856404',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px'
                            }}>
                                {question.status}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserDashboard;