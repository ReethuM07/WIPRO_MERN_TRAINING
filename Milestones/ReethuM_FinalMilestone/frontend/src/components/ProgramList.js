import React, { useEffect, useState } from 'react';
import ProgramCard from './ProgramCard';
import './ProgramList.css';

const API_URL = process.env.REACT_APP_API_URL;

const ProgramList = ({ userId }) => {

    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrolledPrograms, setEnrolledPrograms] = useState([]);
    const [statusMessage, setStatusMessage] = useState({});

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await fetch(`${API_URL}/programs`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setPrograms(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async (programId) => {
        try {
            const response = await fetch(`${API_URL}/enroll`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, programId })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setEnrolledPrograms(prev => [...prev, programId]);

            setStatusMessage({
                type: 'success',
                message: 'Enrollment successful!'
            });

        } catch (err) {
            setStatusMessage({
                type: 'error',
                message: err.message
            });
        }

        setTimeout(() => setStatusMessage({}), 3000);
    };

    if (loading) return <p className="loading">Loading programs...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="program-list-container">
            <h2>Available Fitness Programs</h2>

            {statusMessage.message && (
                <div className={`status-message ${statusMessage.type}`}>
                    {statusMessage.message}
                </div>
            )}

            <div className="programs-grid">
                {programs.map(program => (
                    <ProgramCard
                        key={program.programId}
                        program={program}
                        onEnroll={handleEnroll}
                        isEnrolled={enrolledPrograms.includes(program.programId)}
                    />
                ))}
            </div>

            {enrolledPrograms.length > 0 && (
                <div className="enrolled-section">
                    <h3>Your Enrolled Programs</h3>
                    <ul>
                        {enrolledPrograms.map(id => {
                            const program = programs.find(p => p.programId === id);
                            return program ? (
                                <li key={id}>{program.name}</li>
                            ) : null;
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProgramList;