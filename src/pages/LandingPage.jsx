import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-overlay">
        <div className="landing-content">
          <h1 className="landing-title">Welcome to <span>SHARESphere</span></h1>
          <p className="landing-subtitle">
            Connect. Share. Grow. Your ultimate community for exchanging resources.
          </p>
          <div className="landing-buttons">
            <Link to="/login" className="landing-btn landing-btn-primary">
              Login
            </Link>
            <Link to="/register" className="landing-btn landing-btn-secondary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
