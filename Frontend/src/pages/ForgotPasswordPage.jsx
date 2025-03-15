import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Auth.css';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send a request to the backend to initiate password reset
            const response = await axios.post('http://localhost:4000/forgot-password', { email });

            // Show success message
            toast.success(response.data.message || 'Password reset email sent successfully!');
        } catch (error) {
            // Show error message
            toast.error(error.response?.data?.message || 'Failed to send password reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>SHARESphere</h1>
                <p>Reset your password to regain access to your account.</p>
            </div>
            <div className="form-container">
                <form className="forgot-password-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="reset-password-btn" disabled={loading}>
                        {loading ? 'Sending...' : 'Reset Password'}
                    </button>
                </form>
            </div>
            <div className="login-option">
                <p>Remember your password? <Link to="/">Log in</Link></p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPasswordPage;