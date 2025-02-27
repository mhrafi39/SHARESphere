import React, { useState } from 'react';
import '../styles/Privacy.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const PrivacyPolicyPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>

      {/* Introduction Section */}
      <div className="policy-section">
        <div className="privacysection-header" onClick={() => toggleSection('introduction')}>
          <h2 className="privacysection-title">Introduction</h2>
          {openSection === 'introduction' ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSection === 'introduction' && (
          <div className="privacysection-content">
            <p>
              Welcome to <strong>SHARESphere</strong>, where your privacy is our priority. This Privacy Policy outlines how we collect, use, and protect your information to ensure a safe and seamless experience on our platform.
            </p>
          </div>
        )}
      </div>

      {/* Data Collection Section */}
      <div className="policy-section">
        <div className="privacysection-header" onClick={() => toggleSection('dataCollection')}>
          <h2 className="privacysection-title">Data Collection</h2>
          {openSection === 'dataCollection' ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSection === 'dataCollection' && (
          <div className="privacysection-content">
            <p>
              We collect the following types of information to enhance your experience:
            </p>
            <ul>
              <li><strong>Personal Information:</strong> Your name, email address, and profile details to personalize your account.</li>
              <li><strong>Usage Data:</strong> Insights into how you interact with our platform to improve functionality.</li>
              <li><strong>Cookies:</strong> Small data files stored on your device to remember your preferences and settings.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Data Usage Section */}
      <div className="policy-section">
        <div className="privacysection-header" onClick={() => toggleSection('dataUsage')}>
          <h2 className="privacysection-title">Data Usage</h2>
          {openSection === 'dataUsage' ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSection === 'dataUsage' && (
          <div className="privacysection-content">
            <p>
              Your data helps us deliver a seamless and personalized experience. Here’s how we use it:
            </p>
            <ul>
              <li>To provide and maintain our services.</li>
              <li>To enhance user experience and optimize platform performance.</li>
              <li>To keep you informed about updates, offers, and new features.</li>
              <li>To comply with legal and regulatory requirements.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Cookies Section */}
      <div className="policy-section">
        <div className="privacysection-header" onClick={() => toggleSection('cookies')}>
          <h2 className="privacysection-title">Cookies</h2>
          {openSection === 'cookies' ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSection === 'cookies' && (
          <div className="privacysection-content">
            <p>
              Cookies are tiny but mighty! They help us:
            </p>
            <ul>
              <li>Remember your preferences and settings for a personalized experience.</li>
              <li>Analyze website traffic to improve performance.</li>
              <li>Deliver tailored content and advertisements.</li>
            </ul>
            <p>
              You can manage or disable cookies through your browser settings at any time.
            </p>
          </div>
        )}
      </div>

      {/* User Rights Section */}
      <div className="policy-section">
        <div className="privacysection-header" onClick={() => toggleSection('userRights')}>
          <h2 className="privacysection-title">Your Rights</h2>
          {openSection === 'userRights' ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSection === 'userRights' && (
          <div className="privacysection-content">
            <p>
              You’re in control! Here are your rights regarding your data:
            </p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data.</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information.</li>
              <li><strong>Deletion:</strong> Request deletion of your data.</li>
              <li><strong>Opt-Out:</strong> Opt-out of marketing communications.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Contact Information Section */}
      <div className="policy-section">
        <div className="privacysection-header" onClick={() => toggleSection('contact')}>
          <h2 className="privacysection-title">Contact Us</h2>
          {openSection === 'contact' ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSection === 'contact' && (
          <div className="privacysection-content">
            <p>
              Have questions or concerns? We’re here to help! Reach out to us at:
            </p>
            <p>
              <strong>Email:</strong> privacy@SHARESphere.com<br />
              <strong>Phone:</strong> +088-01*********<br />
              <strong>Address:</strong> 123 Privacy Lane, Data City, DC 12345
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
