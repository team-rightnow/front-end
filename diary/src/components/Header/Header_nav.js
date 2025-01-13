import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Header_nav.css';

function Header_nav({ isLoggedIn, onLogout }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    const handleMyPage = () => {
        navigate('/mypage');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="Header_nav">
            <h1 className="logo" onClick={handleLogoClick}>FeelsLike</h1>
            <button className="menu-toggle" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
            <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
                <ul className="nav-links">
                    <li>About Us</li>
                    <li>Contact Us</li>
                    {isLoggedIn && (
                        <>
                            <li onClick={handleLogout}>Logout</li>
                            <li onClick={handleMyPage}>My Page</li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header_nav;
