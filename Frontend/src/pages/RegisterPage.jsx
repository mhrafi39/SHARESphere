import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "../styles/Auth.css";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const [uploading, setUploading] = useState(false);

    // Validation schema
    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name is required*"),
        lastName: Yup.string().required("Last name is required*"),
        emailOrPhone: Yup.string()
            .required("Email or phone is required*")
            .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, "Invalid email format*"),
        password: Yup.string()
            .required("Password is required*")
            .min(8, "Password must be at least 8 characters*")
            .matches(/[A-Z]/, "Must contain an uppercase letter*")
            .matches(/[0-9]/, "Must contain a number*"),
        birthday: Yup.date().required("Birthday is required*"),
        gender: Yup.string().required("Gender is required*"),
        nidPassport: Yup.mixed().required("NID/Passport image is required*"),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            emailOrPhone: "",
            password: "",
            birthday: "",
            gender: "",
            nidPassport: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            setServerError("");
            setUploading(true);

            try {
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                    formData.append(key, values[key]);
                });

                const response = await axios.post("http://localhost:4000/register", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200) {
                    navigate("/otp", { state: { email: values.emailOrPhone } });
                }
            } catch (error) {
                console.error("Registration error:", error.response ? error.response.data : error.message);
                setServerError(error.response?.data?.message || "Registration failed. Try again.");

                // Show toast if user already exists
                if (error.response?.data?.message === "An account with this email or phone number already exists") {
                    toast.error("An account with this email or phone number already exists", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            } finally {
                setUploading(false);
            }
        },
    });

    return (
        <div className="main">
            <div className="before">
                <div className="container">
                    <div className="form-container">
                        <div className="header">
                            <h1>SHARESphere</h1>
                            <p>Sign up and start sharing!</p>
                        </div>

                        {serverError && <div className="error-message">{serverError}</div>}

                        <form className="signup-form" onSubmit={formik.handleSubmit}>
                            <div className="name-fields">
                                <input
                                    type="text"
                                    className="firstName"
                                    placeholder="First Name"
                                    {...formik.getFieldProps("firstName")}
                                />
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <div className="error-message">{formik.errors.firstName}</div>
                                )}
                                <input
                                    type="text"
                                    className="lastName"
                                    placeholder="Last Name"
                                    {...formik.getFieldProps("lastName")}
                                />
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <div className="error-message">{formik.errors.lastName}</div>
                                )}
                            </div>

                            <input
                                type="text"
                                name="emailOrPhone"
                                placeholder="Email or Phone"
                                {...formik.getFieldProps("emailOrPhone")}
                            />
                            {formik.touched.emailOrPhone && formik.errors.emailOrPhone && (
                                <div className="error-message">{formik.errors.emailOrPhone}</div>
                            )}

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="error-message">{formik.errors.password}</div>
                            )}

                            <input
                                type="date"
                                name="birthday"
                                {...formik.getFieldProps("birthday")}
                            />
                            {formik.touched.birthday && formik.errors.birthday && (
                                <div className="error-message">{formik.errors.birthday}</div>
                            )}

                            <label>Gender:</label>
                            <select className="gender" {...formik.getFieldProps("gender")}>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="custom">Custom</option>
                            </select>
                            {formik.touched.gender && formik.errors.gender && (
                                <div className="error-message">{formik.errors.gender}</div>
                            )}

                            <label>NID/Passport (Image)</label>
                            <input
                                type="file"
                                className="nidPassport"
                                accept="image/*"
                                onChange={(event) => formik.setFieldValue("nidPassport", event.currentTarget.files[0])}
                            />
                            {formik.touched.nidPassport && formik.errors.nidPassport && (
                                <div className="error-message">{formik.errors.nidPassport}</div>
                            )}

                            <button type="submit" className="signup-btn" disabled={uploading}>
                                {uploading ? "Registering..." : "Register"}
                            </button>
                        </form>

                        <div className="login-option">
                            <p>Already have an account? <Link to="/login">Log in</Link></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast container */}
            <ToastContainer />
        </div>
    );
};

export default RegisterPage;