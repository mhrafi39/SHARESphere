import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/Auth.css';

const LoginPage = () => {
    // Define validation schema using Yup
    const validationSchema = Yup.object({
        emailOrPhone: Yup.string()
            .required('Required')
            .test('is-email-or-phone', 'Invalid email or phone number', value => {
                // Simple regex for email or phone number validation
                const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
                return emailRegex.test(value) || phoneRegex.test(value);
            }),
        password: Yup.string()
            .required('Required')
            .min(8, 'Password must be at least 8 characters long'),
    });

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            emailOrPhone: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            // Handle form submission
            console.log('Form data submitted:', values);
            // Redirect or further processing
        },
    });

    return (
        <div className='main'>
            <div className='before'>
                <div className="container">
                    <div className="form-container">
                        <div className="header">
                            <h1>SHARESphere</h1>
                            <p>Connect with friends and the community around you on SHARESphere.</p>
                        </div>
                        <form className="login-form" onSubmit={formik.handleSubmit}>
                            <input
                                type="text"
                                name="emailOrPhone"
                                placeholder="Email or Phone Number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.emailOrPhone}
                            />
                            {formik.touched.emailOrPhone && formik.errors.emailOrPhone ? (
                                <div className="error">{formik.errors.emailOrPhone}</div>
                            ) : null}

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error">{formik.errors.password}</div>
                            ) : null}

                            <button type="submit" className="login-btn">Log In</button>
                            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
                            <hr />
                            <Link to="/register">
                                <button type="button" className="create-account-btn">Create New Account</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;