import React, { useState, useContext } from 'react';
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from '../../Context';

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleInput = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === formData.email && user.password === formData.password);
        if (user) {
            localStorage.setItem('isLoggedIn', true);
            setIsLoggedIn(true);
            navigate('/');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <>
            <div className={`login-container ${theme ? 'dark-theme' : 'light-theme'}`}>
                <div className="form-container">
                    <h2 className={`${theme ? 'light-text-color' : 'light-text-color'}`}>Login to Your Account</h2> <br />
                    <form id="login-form" className="form" onSubmit={handleSubmit}>
                        <input className={`${theme ? 'light-text-color' : 'light-text-color'}`} onChange={handleInput} type="email" name="email" placeholder="Email" value={formData.email} required />
                        <input className={`${theme ? 'light-text-color' : 'light-text-color'}`} onChange={handleInput} type="password" name='password' placeholder="Password" value={formData.password} required />
                        <button type="submit" className="ctaa-button">Login</button>
                        {error && <p className="error-message">{error}</p>}
                        <p className={`${theme ? 'light-text-color' : 'light-text-color'}`}>Don't have an account?
                            <Link style={{ marginLeft: '5px' }} to="/register">
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
