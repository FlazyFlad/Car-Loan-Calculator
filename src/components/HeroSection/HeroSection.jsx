import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './HeroSection.css'
import Typed from 'typed.js';


const HeroSection = () => {
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
        <section className="hero">
            <div className="hero-content">
                <h1 className="animated-text"> <span className="auto_input"></span></h1>
                <p>Explore our easy car loan options tailored just for you.</p>

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
