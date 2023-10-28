import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css'

const NotFoundPage = () => {
    return (
        <>
        
        <div className="notfound-bg">
            <div className="not-found-container">
                <h1>Looks like you're lost</h1>
                <p>The page you are looking for is not available!</p>
                <Link to="/" className="cta-button">Go to Home</Link>
            </div>
        </div>

        </>
    );
}

export default NotFoundPage;
