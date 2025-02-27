import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

const ForgotPasswordPage = () => {
    return (
        <div className="container">
            <div className="header">
                <h1>SHARESphere</h1>
                <p>Reset your password to regain access to your account.</p>
            </div>
            <div className="form-container">
                <form className="forgot-password-form">
                    <input type="email" placeholder="Enter your email" required />
                    <button type="submit" className="reset-password-btn">Reset Password</button>
                </form>
            </div>
            <div className="login-option">
                <p>Remember your password? <Link to="/">Log in</Link></p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;