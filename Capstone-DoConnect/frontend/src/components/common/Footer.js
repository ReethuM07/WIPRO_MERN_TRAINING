import React from 'react';

const Footer = () => {

    //Footer styling
    const footerStyle = {
        backgroundColor: '#f8f9fa',
        padding: '20px 0',
        textAlign: 'center',
        borderTop: '1px solid #ddd',
        marginTop: '50px'
    };

    return (
        <footer style={footerStyle}>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} DoConnect. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;