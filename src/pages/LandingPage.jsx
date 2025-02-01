import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to SHARESphere</h1>
        <p>Your community for sharing resources and helping each other.</p>
        <div className="landing-buttons">
          <Link to="/login" className="landing-btn">Login</Link>
          <Link to="/register" className="landing-btn">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;