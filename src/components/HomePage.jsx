import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Welcome to My App!</h1>
            <p>This is the home page. Feel free to explore around.</p>
            <button
                onClick={() => alert('You clicked the button!')}
                style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}
            >
                Click me
            </button>

            <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </div>
    );
};

export default HomePage;