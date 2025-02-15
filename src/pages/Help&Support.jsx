import React, { useState } from 'react';
import '../styles/Support.css';
import { FaChevronDown, FaChevronUp, FaEnvelope, FaQuestionCircle, FaLifeRing } from 'react-icons/fa';

const HelpAndSupportPage = () => {
  const [openSection, setOpenSection] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been sent! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="help-and-support-container">
      <h1>Help & Support</h1>

      {/* FAQs Section */}
      <div className="support-section">
        <div className="supportsection-header" onClick={() => toggleSection('faqs')}>
          <FaQuestionCircle className="supporticon" />
          <h2>Frequently Asked Questions</h2>
          {openSection === 'faqs' ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSection === 'faqs' && (
          <div className="supportsection-content">
            <div className="supportfaq-item">
              <h3>How do I reset my password?</h3>
              <p>
                To reset your password, go to the login page and click on "Forgot Password." Enter your email, and we'll send you a reset link.
              </p>
            </div>
            <div className="supportfaq-item">
              <h3>How do I upload a resource?</h3>
              <p>
                Navigate to the "Upload" section, fill in the details, and select the file to upload. Click "Submit" to finish.
              </p>
            </div>
            <div className="supportfaq-item">
              <h3>How do I contact support?</h3>
              <p>
                You can contact support by filling out the form below or emailing us directly at <strong>support@resourceshare.com</strong>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Contact Form Section */}
      <div className="support-section">
        <div className="supportsection-header" onClick={() => toggleSection('supportcontactForm')}>
          <FaEnvelope className="supporticon" />
          <h2>Contact Us</h2>
          {openSection === 'contactForm' ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSection === 'supportcontactForm' && (
          <div className="supportsection-content">
            <form onSubmit={handleSubmit} className="supportcontact-form">
              <div className="supportform-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div className="supportform-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="supportform-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Write your message..."
                />
              </div>
              <button type="submit" className="supportsubmit-button">Submit</button>
            </form>
          </div>
        )}
      </div>

      {/* Support Resources Section */}
      <div className="support-section">
        <div className="supportsection-header" onClick={() => toggleSection('resources')}>
          <FaLifeRing className="supporticon" />
          <h2>Support Resources</h2>
          {openSection === 'resources' ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSection === 'resources' && (
          <div className="section-content">
            <p>Here are some additional resources to assist you:</p>
            <ul className="supportresources-list">
              <li><a href="/user-guide">📖 User Guide</a></li>
              <li><a href="/video-tutorials">📹 Video Tutorials</a></li>
              <li><a href="/community-forum">💬 Community Forum</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpAndSupportPage;
