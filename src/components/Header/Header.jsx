import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

const Header = ({ isLoggedIn, onLogout }) => {
    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', false);
        onLogout();
    };

    return (
        <>
            <header>
                <div className="container-header">
                    <div className="logo">
                        <Link to="/"> <i className="fa fa-car" aria-hidden="true"></i> Your Car <span>Loan</span></Link>
                    </div>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>

                            <li>
                                <Link to="/loan-calculator">Loan Calculator</Link>
                            </li>

                            <li>
                                <Link to="about-us">About Us</Link>
                            </li>

                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <Link to="/profile">Profile</Link>
                                    </li>
                                    <li>
                                        <Link onClick={handleLogout} class="act-a-link" to="/">
                                            <button class="act-link">
                                                Log Out
                                            </button>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link class="act-a-link" to="/register">
                                        <button class="act-link">
                                            Sign Up
                                        </button>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
