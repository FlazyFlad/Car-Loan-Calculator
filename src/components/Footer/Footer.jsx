import React, { useContext } from 'react';
import './Footer.css'
import { ThemeContext } from '../../Context';

const Footer = () => {
    const { theme } = useContext(ThemeContext);


    return (
        
        <>
        
        <footer className={`${theme ? 'dark-theme' : 'light-theme'}`}>
            <div className='footer-content'>
                <p className={`footer-content ${theme ? 'dark-theme' : 'light-theme'}`}>&copy; 2023 Your Car Loan. All Rights Reserved.</p>
            </div>
        </footer>

        </>

        
    );
}

export default Footer;
