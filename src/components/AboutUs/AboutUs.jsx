import React, { useContext } from 'react';
import './AboutUs.css'

import FirstImage from './1.png';
import SecondImage from './2.png';
import { ThemeContext } from '../../Context';

const AboutUs = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <>

            <div className={`a-container ${theme ? 'dark-reverse' : 'light-reverse'}`}>

                <div className={`about-section ${theme ? 'dark-reverse' : 'light-reverse'}`}>
                    <div className="row">
                        <div className="a-col col-sm-12 col-md-6">
                            <img src={FirstImage} alt="Some 1" className="img-fluid" />
                        </div>
                        <div className="a-col col-sm-12 col-md-6">
                            <h2 className='a-header2'>Section 1 Header</h2>
                            <p className='a-par'>Text describing the first section. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <a href="/" className="cta-button">Learn More</a>
                        </div>
                    </div>
                </div>

                <div className={`about-section reverse ${theme ? 'dark-theme' : 'light-theme'}`}>
                    <div className="row flex-md-row-reverse">
                        <div className="a-col col-sm-12 col-md-6">
                            <img src={SecondImage} alt="Some 2" className="img-fluid" />
                        </div>
                        <div className="a-col col-sm-12 col-md-6">
                            <h2 className='a-header2'>Section 2 Header</h2>
                            <p className='a-par'>Text describing the second section. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <a href="/" className="cta-button">Discover More</a>
                        </div>
                    </div>
                </div>

            </div>


        </>
    );
}

export default AboutUs;
