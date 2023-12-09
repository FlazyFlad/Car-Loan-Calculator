import React, { useState, useContext } from 'react';
import './Register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../Context';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/authActions';

const Register = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const dispatch = useDispatch();
    const registering = useSelector((state) => state.auth?.registering);
    const registerError = useSelector((state) => state.auth?.registerError);
    const registrationSuccess = useSelector((state) => state.auth?.registrationSuccess);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
        iin: '',
        data_birth: '',
    });

    console.log('registerError', registerError)

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setFormData({
            ...formData,
            data_birth: selectedDate,
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    console.log(registrationSuccess)

    const handleSubmit = (e) => {
        console.log(formData)
        e.preventDefault();
        dispatch(register(formData))
            .then(() => {
                if (registrationSuccess) {
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.error('Registration error:', error);
            });
    };

    if (registrationSuccess) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <div className={`register-container ${theme ? 'dark-theme' : 'light-theme'}`}>
                <div className={`form-container ${theme ? 'darker-theme' : 'lighter-theme'}`}>
                    <h2>Register for Your Car Loan</h2> <br />
                    <form id="register-form" className="form" onSubmit={handleSubmit}>

                        <input
                            className={`${theme
                                ?
                                'dark-text-color'
                                :
                                'dark-text-color'}`}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            className={`${theme
                                ?
                                'dark-text-color'
                                :
                                'dark-text-color'}`}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            className={`${theme
                                ?
                                'dark-text-color'
                                :
                                'dark-text-color'}`}
                            type="password"
                            name="password2"
                            placeholder="Repeat Password"
                            value={formData.password2}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            className={`${theme
                                ?
                                'dark-text-color'
                                :
                                'dark-text-color'}`}
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            className={`${theme ? 'dark-text-color' : 'dark-text-color'}`}
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            className={`${theme ? 'dark-text-color' : 'dark-text-color'}`}
                            type="text"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            name="iin"
                            placeholder="Individual identification number (12 numbers)"
                            value={formData.iin}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            type="date"
                            name="date_birth"
                            className={`${theme ? 'dark-text-color' : 'dark-text-color'}`}
                            value={formData.data_birth}
                            onChange={handleDateChange}
                            required
                        />

                        <button type="submit" className="ctaa-button" disabled={registering}>
                            {registering ? 'Registering...' : 'Register'}
                        </button>
                        {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
                        <p>Already have an account?
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
