import React, { useState, useEffect } from 'react';
import Header from "./components/Header/Header";
import {Route, Routes, useNavigate  } from "react-router-dom";
import HeroSection from "./components/HeroSection/HeroSection";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AboutUs from "./components/AboutUs/AboutUs";
import LoanCalculator from "./components/LoanCalculator/LoanCalculator";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Footer from "./components/Footer/Footer";
import Profile from './components/Profile/Profile';
import { ThemeContext } from './Context';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus, logout } from './actions/authActions';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [theme, setTheme] = useState(true);

    const handleChangeTheme = () => {
        setTheme(prevTheme => !prevTheme);
      };

    // useEffect(() => {
    //     setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    // }, []);

    // useEffect(() => {
    //     dispatch(checkAuthStatus(accessToken));
    //   }, [dispatch]);
    
      const handleLogout = () => {
        dispatch(logout());
      };

    return (
        <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
                <div className={`app-container ${theme ? 'light-bgc-color' : 'dark-bgc-color'}`}>
                    <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                    <div className={`app-spacer ${theme ? 'light-bgc-color' : 'dark-bgc-color'}`}>
                    <Routes>
                        <Route path="/" element={<HeroSection />}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/register" element={<Register />}/>
                        <Route path="/about-us" element={<AboutUs />}/>
                        <Route path="/loan-calculator" element={<LoanCalculator />}/>

                        <Route path="/profile" element={<Profile />} />

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    </div>
                    <Footer />
                </div>
        </ThemeContext.Provider>
    );
};

export default App;
