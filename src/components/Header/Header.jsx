import React, { useState, useEffect, useContext}  from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import { ThemeContext } from "../../Context";

const Header = ({ isLoggedIn, onLogout }) => {

    const { theme, handleChangeTheme } = useContext(ThemeContext);

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', false);
        onLogout();
    };

    const [menuActive, setMenuActive] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 812) {
                setMenuActive(true);
            } else {
                setMenuActive(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleMenuToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const links = [
        { id: 1, text: 'Home', url: '/' },
        { id: 2, text: 'Loan Calculator', url: '/loan-calculator' },
        { id: 3, text: 'About Us', url: '/about-us' },
        // Добавьте четвертую ссылку только если пользователь вошел в систему
        ...(isLoggedIn
            ? [{ id: 4, text: 'Profile', url: '/profile' }]
            : []
        )
        // Добавьте другие ссылки по мере необходимости
    ];

    return (
        <>
            <header className={theme ? 'dark-theme' : 'light-theme'}>
                <div className="container-header">
                    <div className="logo">
                        <Link to="/" className={`${theme ? 'dark-theme' : 'light-theme'}`}> <i className="fa fa-car" aria-hidden="true"></i> Your Car <span>Loan</span></Link>
                    </div>

                <div className="dropdown">
                {menuActive && (
                        <div className='menu-bar'>
                            <i className="fa-solid fa-bars" onClick={handleMenuToggle}></i>
                        </div>
                )}
                {showDropdown && menuActive && (

                    <div className="dropdown-content">
                        <ul>
                            {links.map(link => (
                                <li key={link.id}>
                                    <Link to={link.url} onClick={handleMenuToggle} className={`${theme ? 'dark-theme' : 'light-theme'}`}>
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                )}
                </div>



                    <nav>
                    
                        <ul>
                        {!menuActive && (
                            <>
                            {links.map(link => (
                                <li key={link.id}>
                                    <Link to={link.url} className={`${theme ? 'dark-theme' : 'light-theme'}`}>
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                                {!theme && (
                                <i className="fa fa-moon-o theme-icon" onClick={handleChangeTheme} aria-hidden="true"></i>
                                )}
                                {theme && (
                                <i className="fa fa-sun-o theme-icon" onClick={handleChangeTheme} aria-hidden="true"></i>
                                )}
                            </>
                        )}
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <Link onClick={handleLogout} className="act-a-link" to="/">
                                            <button className="act-link">
                                                Log Out
                                            </button>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link className={`act-a-link ${theme ? 'dark-theme' : 'light-theme'}`} to="/register">
                                        <button className="act-link">
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
