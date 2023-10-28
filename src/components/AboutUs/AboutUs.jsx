import React from 'react';
import './AboutUs.css'

import FirstImage from './1.png';
import SecondImage from './2.png';

const AboutUs = () => {
    return (
        <>
        
        <div className="about-section">
            <div className="about-content">
                <div className="left">
                    <img src={FirstImage} alt="Some 1" />
                </div>
                <div className="right">
                    <h2>Section 1 Header</h2>
                    <p>Text describing the first section. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                        <br />

                    <a href="/" className="cta-button">Learn More</a>
                </div>
            </div>
        </div>

        <div className="about-section reverse">
            <div className="about-content">
                <div className="right">
                    <img src={SecondImage} alt="Some 2" />
                </div>
                <div className="right">
                    <h2>Section 2 Header</h2>
                    <p>Text describing the second section. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                        <br />

                    <a href="/" className="cta-button">Discover More</a>
                </div>
            </div>
        </div>

        </>
    );
}

export default AboutUs;
