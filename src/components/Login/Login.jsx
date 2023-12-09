import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from '../../Context';
import { useDispatch, useSelector } from 'react-redux';
import { login, getUserDetails } from '../../actions/authActions';

import { Navigate } from 'react-router-dom';

const Login = () => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const authError = useSelector(state => state.auth?.error?.detail);
    const accessToken = useSelector(state => state?.auth.access_token);
    const userDetails = useSelector(state => state?.auth.user);
    const isLoggedIn = useSelector(state => state?.auth.isLoggedIn);

    console.log('authError', authError)

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });


    console.log(accessToken, userDetails)

    useEffect(() => {
        if (accessToken && !authError) {
            dispatch(getUserDetails(accessToken));
        }
    }, [accessToken, authError, dispatch]);

    const handleInput = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await dispatch(login(formData.username, formData.password));
    };

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="login-container">
                <div className={`form-container ${theme ? 'darker-theme' : 'lighter-theme'}`}>
                    <h2 className='font-semibold'>Login to Your Account</h2> <br />
                    <form id="login-form" className="form" onSubmit={handleSubmit}>
                        <input
                            onChange={handleInput}
                            className='text-dark'
                            type="text" name="username"
                            placeholder="Username"
                            value={formData.username}
                            required />
                        <input onChange={handleInput}
                               className='text-dark'
                               type="password"
                               name='password'
                               placeholder="Password"
                               value={formData.password}
                               required />
                        <button type="submit" className="ctaa-button">Login</button>

                        {authError && <p className='text-red-500 text-sm'>{authError}</p>}

                        <p >Don't have an account?
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
