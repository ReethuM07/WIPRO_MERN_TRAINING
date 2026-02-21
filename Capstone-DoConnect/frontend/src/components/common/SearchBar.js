import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search questions..." }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={placeholder}
                    style={{
                        flex: 1,
                        padding: '12px',
                        border: '2px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '16px'
                    }}
                />
                <button
                    type="submit"
                    className="btn"
                    style={{ padding: '12px 30px' }}
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;