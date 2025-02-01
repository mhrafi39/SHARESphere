import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

const RegisterPage = () => {
    return (
      <div className='main'>
        <div className="container">
            <div className="header">
                <h1>SHARESphere</h1>
                <p>Sign up to connect with friends and the community around you on SHARESphere.</p>
            </div>
            <div className="form-container">
                <form className="signup-form">
                    <div className="name-fields">
                        <input type="text" placeholder="First name" required />
                        <input type="text" placeholder="Last name" required />
                    </div>
                    <input type="email" placeholder="Email or phone number" required />
                    <input type="password" placeholder="New password" required />
                    <label htmlFor="birthday">Birthday</label>
                    <input type="date" id="birthday" required />
                    <label htmlFor="gender">Gender</label>
                    <div className="gender-options">
                        <label><input type="radio" name="gender" value="female" /> Female</label>
                        <label><input type="radio" name="gender" value="male" /> Male</label>
                        <label><input type="radio" name="gender" value="custom" /> Custom</label>
                    </div>
                    <label htmlFor="nid-passport">Upload NID or Passport (Image)</label>
                    <input type="file" id="nid-passport" accept="image/*" required />
                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
                <div className="login-option">
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </div>
            </div>
           </div>   
        </div>
    );
};

export default RegisterPage;