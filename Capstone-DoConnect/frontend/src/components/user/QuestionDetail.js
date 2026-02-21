import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import questionApi from '../../services/questionApi';
import answerApi from '../../services/answerApi';
import { getUser, isAuthenticated } from '../../services/auth';
import LoadingSpinner from '../common/LoadingSpinner';

const QuestionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newAnswer, setNewAnswer] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [commentInputs, setCommentInputs] = useState({});
    const user = getUser();

    //Fetch question & answers
    useEffect(() => {
        fetchQuestionAndAnswers();
    }, [id]);

    const fetchQuestionAndAnswers = async () => {
        try {
            const questionRes = await questionApi.getQuestionById(id);
            setQuestion(questionRes.data);
            setAnswers(questionRes.data.answers || []);
        } catch (error) {
            console.error('Error fetching question:', error);
            alert('Failed to load question');
            navigate('/questions');
        } finally {
            setLoading(false);
        }
    };

    //Submit answer
    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        if (!newAnswer.trim()) return;

        setSubmitting(true);
        try {
            await answerApi.createAnswer({
                content: newAnswer,
                questionId: id
            });
            alert('Answer submitted successfully! It will be visible after admin approval.');
            setNewAnswer('');
            fetchQuestionAndAnswers();
        } catch (error) {
            alert(error.message || 'Failed to submit answer');
        } finally {
            setSubmitting(false);
        }
    };
    //Like answer
    const handleLike = async (answerId) => {
        if (!isAuthenticated()) {
            alert('Please login to like answers');
            return;
        }

        if (question.status === 'resolved') {
            alert('Cannot like answers on a resolved question');
            return;
        }

        try {
            await answerApi.likeAnswer(answerId);
            fetchQuestionAndAnswers();
        } catch (error) {
            console.error('Error liking answer:', error);
        }
    };
    //Add comment
    const handleComment = async (answerId) => {
        const commentContent = commentInputs[answerId];
        if (!commentContent?.trim()) return;

        if (question.status === 'resolved') {
            alert('Cannot comment on a resolved question');
            return;
        }

        try {
            await answerApi.addComment(answerId, commentContent);
            setCommentInputs({ ...commentInputs, [answerId]: '' });
            fetchQuestionAndAnswers();
        } catch (error) {
            alert(error.message || 'Failed to add comment');
        }
    };
    //Delete answer
    const handleDeleteAnswer = async (answerId) => {
        if (!window.confirm('Are you sure you want to delete this answer?')) return;

        try {
            await answerApi.deleteAnswer(answerId);
            fetchQuestionAndAnswers();
        } catch (error) {
            alert(error.message || 'Failed to delete answer');
        }
    };
    //Mark resolved
    const handleResolveQuestion = async () => {
        if (!window.confirm('Mark this question as resolved?')) return;

        try {
            await questionApi.resolveQuestion(id);
            fetchQuestionAndAnswers();
        } catch (error) {
            alert(error.message || 'Failed to mark as resolved');
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!question) return <div>Question not found</div>;

    const isOwner = user?._id === question.askedBy?._id;
    const isAdmin = user?.role === 'admin';
    const isResolved = question.status === 'resolved';

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            {/* Question */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <h1>{question.title}</h1>
                    {question.status !== 'approved' && (
                        <span style={{
                            backgroundColor: question.status === 'resolved' ? '#28a745' : '#ffc107',
                            color: question.status === 'resolved' ? 'white' : '#000',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>
                            {question.status === 'resolved' ? 'RESOLVED' : question.status.toUpperCase()}
                        </span>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <span style={{
                        backgroundColor: '#e9ecef',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '13px'
                    }}>
                        {question.topic}
                    </span>
                    <span style={{ color: '#666' }}>
                        Asked by {question.askedBy?.username} • {new Date(question.createdAt).toLocaleDateString()}
                    </span>
                </div>

                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px', whiteSpace: 'pre-wrap' }}>
                    {question.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                    <span style={{ color: '#888' }}>views: {question.views || 0} views</span>

                    {(isOwner || isAdmin) && !isResolved && (
                        <button onClick={handleResolveQuestion} className="btn btn-success">
                            Mark Resolved
                        </button>
                    )}
                </div>
            </div>

            {isResolved && (
                <div style={{
                    backgroundColor: '#d4edda',
                    border: '2px solid #28a745',
                    borderRadius: '8px',
                    padding: '20px',
                    margin: '20px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                    <div>
                        <h3 style={{ color: '#155724', marginBottom: '5px' }}>Question Resolved</h3>
                        <p style={{ color: '#155724', margin: 0 }}>
                            This question has been marked as resolved.
                            <strong> No new answers, likes, or comments can be added.</strong>
                        </p>
                    </div>
                </div>
            )}

            {/* Answer Form */}
            {isAuthenticated() && question.status === 'approved' && !isResolved && (
                <div className="card">
                    <h3>Your Answer</h3>
                    <form onSubmit={handleAnswerSubmit}>
                        <textarea
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            rows="5"
                            placeholder="Write your answer here..."
                            className="form-group"
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <button type="submit" className="btn" disabled={submitting || !newAnswer.trim()}>
                            {submitting ? 'Posting...' : 'Post Answer'}
                        </button>
                    </form>
                </div>
            )}
            
            {/* Answers */}
            <div>
                <h3 style={{ marginBottom: '20px' }}>{answers.length} Answers</h3>

                {answers.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '40px', background: '#f8f9fa', borderRadius: '8px' }}>
                        No answers yet. Be the first to answer!
                    </p>
                ) : (
                    answers.map(answer => (
                        <div key={answer._id} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <strong>{answer.answeredBy?.username}</strong>
                                <span style={{ color: '#888', fontSize: '14px' }}>
                                    {new Date(answer.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <p style={{ whiteSpace: 'pre-wrap', marginBottom: '15px' }}>
                                {answer.content}
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                                <button
                                    onClick={() => handleLike(answer._id)}
                                    disabled={isResolved}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: isAuthenticated() && !isResolved ? 'pointer' : 'not-allowed',
                                        color: answer.likes?.includes(user?._id) ? '#007bff' : '#666',
                                        fontSize: '16px',
                                        opacity: isResolved ? 0.5 : 1
                                    }}
                                    title={isResolved ? "Likes disabled for resolved questions" : "Like this answer"}
                                >
                                    👍 {answer.likesCount || 0}
                                </button>

                                {(isAdmin || answer.answeredBy?._id === user?._id) && (
                                    <button
                                        onClick={() => handleDeleteAnswer(answer._id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#dc3545'
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>

                            {answer.comments?.length > 0 && (
                                <div style={{ marginTop: '15px', paddingLeft: '20px', borderLeft: '3px solid #007bff' }}>
                                    <h5 style={{ marginBottom: '10px' }}>Comments</h5>
                                    {answer.comments.map(comment => (
                                        <div key={comment._id} style={{ marginBottom: '8px', fontSize: '14px' }}>
                                            <strong>{comment.commentedBy?.username}:</strong>{' '}
                                            <span style={{ color: '#666' }}>{comment.content}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {isAuthenticated() && !isResolved && (
                                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        value={commentInputs[answer._id] || ''}
                                        onChange={(e) => setCommentInputs({
                                            ...commentInputs,
                                            [answer._id]: e.target.value
                                        })}
                                        onKeyPress={(e) => e.key === 'Enter' && handleComment(answer._id)}
                                        style={{
                                            flex: 1,
                                            padding: '8px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    <button
                                        onClick={() => handleComment(answer._id)}
                                        className="btn"
                                        style={{ padding: '8px 15px' }}
                                    >
                                        Comment
                                    </button>
                                </div>
                            )}

                            {isAuthenticated() && isResolved && (
                                <div style={{
                                    marginTop: '15px',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px',
                                    color: '#6c757d',
                                    fontSize: '14px',
                                    textAlign: 'center',
                                    border: '1px dashed #dee2e6'
                                }}>
                                    Comments are disabled for resolved questions
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default QuestionDetail;