import React, { useEffect, useContext} from 'react';
import { Link } from "react-router-dom";
import './HeroSection.css'
import Typed from 'typed.js';
import { ThemeContext } from '../../Context';
import LightThemeCarImage from './light-theme-car.jpg'
import DarkThemeCarImage from './dark-theme-car.png'

const HeroSection = () => {

    const { theme } = useContext(ThemeContext);
    const backgroundImage = theme ? DarkThemeCarImage : LightThemeCarImage;

    useEffect(() => {
        const typed = new Typed('.auto_input', {
          strings: ['Find Your Dream Car', 'Calculate Your Car Loan'],
          typeSpeed: 100,
          backSpeed: 100,
          loop: true,
        });
    
        // Clean up on unmount
        return () => {
          typed.destroy();
        };
      }, []); // Empty dependency array ensures this effect runs once after the initial render

    return (
        <>
        <section className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className={`hero-content ${theme ? 'hero-dark-theme' : 'hero-light-theme'}`}>
                <h1 className={`animated-text ${theme ? 'dark-text-color' : 'light-text-color'}`}> <span className={`auto_input ${theme ? 'dark-text-color' : 'light-text-color'}`}></span></h1>
                <p className={`${theme ? 'dark-text-color' : 'light-text-color'}`}>Explore our easy car loan options tailored just for you.</p>

                <Link to="/loan-calculator">
                    <button className="ctaa-button">
                        Get Started
                    </button>
                </Link>
            
            </div>
            
        </section>
        
        </>
    );
}

export default HeroSection;
