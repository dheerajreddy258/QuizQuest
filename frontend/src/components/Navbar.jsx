import React from 'react';
import './Navbar.css';
import logo from '../img_navbar.jpg';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    localStorage.removeItem('username');  // Clear the username on logout
    navigate('/');  // Navigate to the login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Quiz App Logo" className="logo" />
        <h1 className="app-title">QuizQuest</h1>
      </div>
      <div className="navbar-right">
        <span className="welcome-message">Welcome, {localStorage.getItem('username')}!</span>
        <button onClick={handleLogout} className="logout-button" aria-label="Logout">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
