import React from 'react';
const LoadingSpinner = () => {

    //Container style
    const spinnerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px'
    };

    //Spinner circle style
    const circleStyle = {
        width: '50px',
        height: '50px',
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #007bff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    };

    //Spin animation
    const keyframes = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    return (
        <>
            <style>{keyframes}</style>
            <div style={spinnerStyle}>
                <div style={circleStyle}></div>
            </div>
        </>
    );
};

export default LoadingSpinner;