import React, { useState, useContext } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../Context';

const Register = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === formData.email);
        if (userExists) {
            setError('User with this email already exists');
        } else {
            users.push(formData);
            localStorage.setItem('users', JSON.stringify(users));
            navigate('/login');
        }
    };
    

    return (
        <>
            <div className={`register-container ${theme ? 'dark-theme' : 'light-theme'}`}>
                <div className="form-container">
                    <h2 className={`${theme ? 'light-text-color' : 'light-text-color'}`}>Register for Your Car Loan</h2> <br />
                    <form id="register-form" className="form" onSubmit={handleSubmit}>
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} required />
                        <button type="submit" className="ctaa-button">Register</button>
                        {error && <p className="error-message">{error}</p>}
                        <p className={`${theme ? 'light-text-color' : 'light-text-color'}`}>Already have an account? 
                            <Link style={{ marginLeft: '5px' }} to="/login">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
