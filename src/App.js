import React, { useState, useEffect } from 'react';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
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
import {Provider} from "react-redux";
import store from "./store";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [theme, setTheme] = useState(true);

    const handleChangeTheme = () => {
        setTheme(prevTheme => !prevTheme);
      };

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    }, []);

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', false);
        setIsLoggedIn(false);
    };

    return (
        <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
                <div className="app-container">
                    <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                    <div className={`app-spacer ${theme ? 'light-bgc-color' : 'dark-bgc-color'}`}>
                    <Routes>
                        <Route path="/" element={<HeroSection />}/>
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
                        <Route path="/register" element={<Register />}/>
                        <Route path="/about-us" element={<AboutUs />}/>
                        <Route path="/loan-calculator" element={<LoanCalculator />}/>
                        <Route path="/profile" element={<Profile />}/>
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    </div>
                    <Footer />
                </div>
        </ThemeContext.Provider>
    );
};

export default App;
