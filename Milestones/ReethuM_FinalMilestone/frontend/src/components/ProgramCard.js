import React from 'react';
import './ProgramCard.css';

const ProgramCard = ({ program, onEnroll, isEnrolled }) => {

    return (
        <div className="program-card">
            <h3>{program.name}</h3>

            <div className="program-details">
                <p><strong>Category:</strong> {program.category}</p>
                <p>
                    <strong>Level:</strong>
                    <span className={`level-badge level-${program.level.toLowerCase()}`}>
                        {program.level}
                    </span>
                </p>
                <p><strong>Price:</strong> ₹{program.price}</p>
            </div>

            <button
                className={`enroll-btn ${isEnrolled ? 'enrolled' : ''}`}
                disabled={isEnrolled}
                onClick={() => onEnroll(program.programId)}
            >
                {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
            </button>
        </div>
    );
};

export default ProgramCard;