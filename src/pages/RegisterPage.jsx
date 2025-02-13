import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/Auth.css';

const RegisterPage = () => {
    // Define validation schema using Yup
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required('First name is required')
            .min(2, 'First name must be at least 2 characters'),
        lastName: Yup.string()
            .required('Last name is required')
            .min(2, 'Last name must be at least 2 characters'),
        emailOrPhone: Yup.string()
            .required('Email or phone number is required')
            .test('is-email-or-phone', 'Invalid email or phone number', value => {
                const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
                return emailRegex.test(value) || phoneRegex.test(value);
            }),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        birthday: Yup.date()
            .required('Birthday is required')
            .max(new Date(), 'Birthday cannot be in the future'),
        gender: Yup.string()
            .required('Gender is required'),
        nidPassport: Yup.mixed()
            .required('NID or Passport is required')
            .test('fileType', 'Only image files are allowed', value => {
                if (value) {
                    return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
                }
                return false;
            }),
    });

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            emailOrPhone: '',
            password: '',
            birthday: '',
            gender: '',
            nidPassport: null,
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log('Form data submitted:', values);
            // Handle form submission (e.g., API call)
        },
    });

    return (
        <div className='main'>
            <div className='before'>
                <div className="container">
                    <div className="form-container">
                        <div className="header">
                            <h1>SHARESphere</h1>
                            <p>Sign up to connect with friends and the community around you on SHARESphere.</p>
                        </div>
                        <form className="signup-form" onSubmit={formik.handleSubmit}>
                            <div className="name-fields">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstName}
                                />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <div className="error">{formik.errors.firstName}</div>
                                ) : null}

                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastName}
                                />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <div className="error">{formik.errors.lastName}</div>
                                ) : null}
                            </div>

                            <input
                                type="text"
                                name="emailOrPhone"
                                placeholder="Email or phone number"
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
                                placeholder="New password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error">{formik.errors.password}</div>
                            ) : null}

                            <label htmlFor="birthday">Birthday</label>
                            <input
                                type="date"
                                id="birthday"
                                name="birthday"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.birthday}
                            />
                            {formik.touched.birthday && formik.errors.birthday ? (
                                <div className="error">{formik.errors.birthday}</div>
                            ) : null}

                            <label htmlFor="gender">Gender</label>
                            <div className="gender-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    /> Female
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    /> Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="custom"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    /> Custom
                                </label>
                            </div>
                            {formik.touched.gender && formik.errors.gender ? (
                                <div className="error">{formik.errors.gender}</div>
                            ) : null}

                            <label htmlFor="nid-passport">Upload NID or Passport (Image)</label>
                            <input
                                type="file"
                                id="nid-passport"
                                name="nidPassport"
                                accept="image/*"
                                onChange={event => {
                                    formik.setFieldValue('nidPassport', event.currentTarget.files[0]);
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.nidPassport && formik.errors.nidPassport ? (
                                <div className="error">{formik.errors.nidPassport}</div>
                            ) : null}

                            <button type="submit" className="signup-btn">Sign Up</button>
                        </form>
                        <div className="login-option">
                            <p>Already have an account? <Link to="/login">Log in</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;