import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/otp.css"; // Import CSS

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Resend Cooldown Timer
  useEffect(() => {
    if (!isResendDisabled) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsResendDisabled(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isResendDisabled]);

  // Handle OTP Input Change
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus forward or backward
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    } else if (!value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setMessage("❌ Please enter all 6 digits.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: location.state?.email, otp: enteredOtp }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Verification successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(`❌ ${data.message || "Invalid OTP. Please try again."}`);
      }
    } catch (error) {
      setMessage("❌ Error verifying OTP. Please try again.");
    }
  };

  // Handle Resend OTP
  const handleResend = async () => {
    setIsResendDisabled(true);
    setMessage("📩 Resending OTP...");

    try {
      const response = await fetch("http://localhost:4000/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: location.state?.email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ A new OTP has been sent to your email.");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Failed to resend OTP. Try again later.");
    }
  };

  return (
    <div className="otp-container">
      <h2 className="otp-heading">🔐 OTP Verification</h2>
      <p className="otp-subtext">Enter the 6-digit code sent to your email.</p>

      <form className="otp-form" onSubmit={handleSubmit}>
        <div className="otp-input-group">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              className="otp-input"
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>

        <button className="otp-button" type="submit">
          Verify OTP
        </button>
      </form>

      <button
        className="otp-resend"
        onClick={handleResend}
        disabled={isResendDisabled}
      >
        {isResendDisabled ? `🔄 Resend in ${resendCooldown}s` : "🔄 Resend OTP"}
      </button>

      {message && <p className="otp-message">{message}</p>}
    </div>
  );
};

export default OTPVerification;
