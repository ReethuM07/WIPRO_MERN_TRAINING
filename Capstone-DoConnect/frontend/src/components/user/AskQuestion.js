import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questionApi from '../../services/questionApi';
import { TOPICS } from '../../utils/constants';

const AskQuestion = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        topic: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    //Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };
    //Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length < 5) {
            newErrors.title = 'Title must be at least 5 characters';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }

        if (!formData.topic) {
            newErrors.topic = 'Please select a topic';
        }

        return newErrors;
    };
    //Submit question
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            await questionApi.createQuestion(formData);
            alert('Question submitted successfully! It will be visible after admin approval.');
            navigate('/user/questions');
        } catch (error) {
            alert(error.message || 'Failed to create question');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '30px' }}>Ask a Question</h1>

            <form onSubmit={handleSubmit} className="card">
                <div className="form-group">
                    <label htmlFor="topic">Topic *</label>
                    <select
                        id="topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        style={{ borderColor: errors.topic ? '#dc3545' : '#ddd' }}
                    >
                        <option value="">Select a topic</option>
                        {TOPICS.map(topic => (
                            <option key={topic} value={topic}>{topic}</option>
                        ))}
                    </select>
                    {errors.topic && <small style={{ color: '#dc3545' }}>{errors.topic}</small>}
                </div>

                <div className="form-group">
                    <label htmlFor="title">Question Title *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., How to implement closures in JavaScript?"
                        style={{ borderColor: errors.title ? '#dc3545' : '#ddd' }}
                    />
                    {errors.title && <small style={{ color: '#dc3545' }}>{errors.title}</small>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Question Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="8"
                        placeholder="Provide detailed explanation of your question..."
                        style={{ borderColor: errors.description ? '#dc3545' : '#ddd' }}
                    />
                    {errors.description && <small style={{ color: '#dc3545' }}>{errors.description}</small>}
                </div>

                <button
                    type="submit"
                    className="btn"
                    disabled={loading}
                    style={{ width: '100%' }}
                >
                    {loading ? 'Submitting...' : 'Submit Question'}
                </button>
            </form>
        </div>
    );
};

export default AskQuestion;