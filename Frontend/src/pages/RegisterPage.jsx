import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/Auth.css";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");

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

            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });

            try {
                const response = await fetch("http://localhost:4000/register", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (response.ok) {
                    navigate("/otp", { state: { email: values.emailOrPhone } });
                } else {
                    setServerError(data.message || "Registration failed. Try again.");
                }
            } catch (error) {
                setServerError("Something went wrong. Please try again later.");
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
                <input type="text" className="firstName" placeholder="First Name" {...formik.getFieldProps("firstName")} />
                <input type="text" className="lastName" placeholder="Last Name" {...formik.getFieldProps("lastName")} />
                </div>

                <input type="text" name="emailOrPhone" placeholder="Email or Phone" {...formik.getFieldProps("emailOrPhone")} />
                <input type="password" name="password" placeholder="Password" {...formik.getFieldProps("password")} />
                <input type="date" name="birthday" {...formik.getFieldProps("birthday")} />

                <label>Gender:</label>
                <select className="gender" {...formik.getFieldProps("gender")}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="custom">Custom</option>
                </select>

                <label>NID/Passport (Image)</label>
                <input type="file" className="nidPassport" accept="image/*" onChange={(event) => formik.setFieldValue("nidPassport", event.currentTarget.files[0])} />

                <button type="submit" className="signup-btn">Register</button>
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
