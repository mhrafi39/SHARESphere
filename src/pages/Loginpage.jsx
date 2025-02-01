import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

const LoginPage = () => {
    return (
      <div className='main'>
        <div className="container">
            <div className="header">
                <h1>SHARESphere</h1>
                <p>Connect with friends and the community around you on SHARESphere.</p>
            </div>
            <div className="form-container">
                <form className="login-form">
                    <input type="text" placeholder="Email or Phone Number" required />
                    <input type="password" placeholder="Password" required />
                    <Link to="/home">
                    <button type="submit" className="login-btn">Log In</button></Link>
                    <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
                    <hr />
                    <Link to="/register">
                        <button type="button" className="create-account-btn">Create New Account</button>
                    </Link>
                </form>
            </div>
        </div>
      </div>
    );
};

export default LoginPage;