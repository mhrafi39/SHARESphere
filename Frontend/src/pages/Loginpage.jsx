import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/Auth.css";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    emailOrPhone: Yup.string()
      .required("Required")
      .test("is-email-or-phone", "Invalid email or phone number", (value) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
        return emailRegex.test(value) || phoneRegex.test(value);
      }),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters long"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: { emailOrPhone: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch("http://localhost:4000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Invalid credentials");
        }

        const data = await response.json();

        // Store JWT token in localStorage
        localStorage.setItem("token", data.token);

        // Redirect based on user role and verification status
        if (data.user.isAdmin) {
          navigate("/admin"); // Redirect to admin dashboard
        } else {
          navigate("/home"); // Redirect to home page for regular users
        }
      } catch (error) {
        setErrorMessage(error.message || "Server error. Please try again later.");
      } finally {
        setLoading(false);
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
                disabled={loading}
              />
              {formik.touched.emailOrPhone && formik.errors.emailOrPhone && (
                <div className="error">{formik.errors.emailOrPhone}</div>
              )}

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                disabled={loading}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}

              {errorMessage && <div className="error">{errorMessage}</div>}

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
              <hr />
              <Link to="/register">
                <button type="button" className="create-account-btn" disabled={loading}>
                  Create New Account
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;