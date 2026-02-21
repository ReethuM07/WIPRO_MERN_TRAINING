import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import questionApi from '../../services/questionApi';
import SearchBar from '../common/SearchBar';
import LoadingSpinner from '../common/LoadingSpinner';
import { TOPICS } from '../../utils/constants';
import { isAuthenticated } from '../../services/auth';

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        topic: '',
        search: ''
    });
    const [pagination, setPagination] = useState({
        page: 1,
        total: 0,
        pages: 0
    });
    //Fetch questions
    useEffect(() => {
        fetchQuestions();
    }, [filters.topic, filters.search, pagination.page]);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const params = {
                page: pagination.page,
                limit: 10,
                ...(filters.topic && { topic: filters.topic }),
                ...(filters.search && { search: filters.search })
            };

            const response = await questionApi.getQuestions(params);
            setQuestions(response.data || []);
            setPagination(response.pagination || { page: 1, total: 0, pages: 0 });
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };
    //Handle search
    const handleSearch = (searchTerm) => {
        setFilters({ ...filters, search: searchTerm });
        setPagination({ ...pagination, page: 1 });
    };
    //Handle topic filter
    const handleTopicChange = (e) => {
        setFilters({ ...filters, topic: e.target.value });
        setPagination({ ...pagination, page: 1 });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading && questions.length === 0) return <LoadingSpinner />;

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Questions</h1>
                {isAuthenticated() && (
                    <Link to="/user/ask" className="btn">Ask Question</Link>
                )}
            </div>

            <SearchBar onSearch={handleSearch} />
            
            {/* Topic Filter */}
            <div style={{ marginBottom: '20px' }}>
                <select
                    value={filters.topic}
                    onChange={handleTopicChange}
                    style={{
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        width: '200px'
                    }}
                >
                    <option value="">All Topics</option>
                    {TOPICS.map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
                    ))}
                </select>
            </div>

            {questions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8f9fa', borderRadius: '8px' }}>
                    <h3>No questions found</h3>
                    <p style={{ color: '#666', marginTop: '10px' }}>
                        {filters.search || filters.topic
                            ? 'Try adjusting your search or filter'
                            : 'Be the first to ask a question!'}
                    </p>
                </div>
            ) : (
                <div>
                    {questions.map(question => (
                        <div key={question._id} className="card">
                            <Link to={`/questions/${question._id}`} style={{ textDecoration: 'none' }}>
                                <h3 style={{ color: '#007bff', marginBottom: '10px' }}>
                                    {question.title}
                                </h3>
                            </Link>

                            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                                <span style={{
                                    backgroundColor: '#e9ecef',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '13px'
                                }}>
                                    {question.topic}
                                </span>
                                <span style={{ fontSize: '14px', color: '#666' }}>
                                    Asked by {question.askedBy?.username || 'Unknown'}
                                </span>
                            </div>

                            <p style={{
                                color: '#666',
                                marginBottom: '15px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                            }}>
                                {question.description}
                            </p>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderTop: '1px solid #eee',
                                paddingTop: '15px'
                            }}>
                                <div style={{ fontSize: '14px', color: '#888' }}>
                                    <span style={{ marginRight: '15px' }}>views: {question.views || 0}</span>
                                    <span>answers: {question.answers?.length || 0}</span>
                                    <span style={{ marginLeft: '15px' }}>date: {formatDate(question.createdAt)}</span>
                                </div>
                                <Link to={`/questions/${question._id}`} className="btn" style={{ padding: '5px 15px' }}>
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuestionList;