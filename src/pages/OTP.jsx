import React, { useState } from "react";
import "../styles/otp.css"; // Import the CSS file

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");

  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Only allow numbers
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp === "123456") {
      setMessage("✅ Verification successful! Redirecting...");
    } else {
      setMessage("❌ Invalid OTP. Please try again.");
    }
  };

  const handleResend = () => {
    setMessage("📩 A new OTP has been sent to your email.");
    setOtp(["", "", "", "", "", ""]); // Clear inputs
  };

  return (
    <div className="otp-container">
      <h2 className="otp-heading">🔐 Gmail OTP Verification</h2>
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

      <button className="otp-resend" onClick={handleResend}>
        🔄 Resend OTP
      </button>

      {message && <p className="otp-message">{message}</p>}
    </div>
  );
};

export default OTPVerification;
