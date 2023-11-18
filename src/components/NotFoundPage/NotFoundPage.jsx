import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css'
import LightThemeCarImage from './404.png'
import DarkThemeCarImage from './404-dark.png'
import { ThemeContext } from '../../Context';

const NotFoundPage = () => {
    
    const { theme } = useContext(ThemeContext);
    const backgroundImage = theme ? DarkThemeCarImage : LightThemeCarImage;

    return (
        <>
        
        <div className="notfound-bg" style={{ backgroundImage: `url(${backgroundImage})` }}>
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
