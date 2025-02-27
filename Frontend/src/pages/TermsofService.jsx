import React, { useState } from 'react';
import '../styles/Service.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const TermsOfServicePage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    { key: 'introduction', title: 'Introduction', content: `Welcome to SHARESphere! These Terms of Service ("Terms") govern your use of our platform. By accessing or using SHARESphere, you agree to comply with and be bound by these Terms. If you do not agree, please do not use our services.` },
    { key: 'userResponsibilities', title: 'User Responsibilities', content: (<ul><li>Provide accurate and complete information during registration.</li><li>Use the platform only for lawful purposes.</li><li>Respect the intellectual property rights of others.</li><li>Not engage in any activity that d
        isrupts or interferes with the platform.</li></ul>) },
    { key: 'contentOwnership', title: 'Content Ownership', content: 'You retain ownership of any content you upload or share on ResourceShare. However, by sharing content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute your content for the purpose of operating and promoting the platform.' },
    { key: 'prohibitedActivities', title: 'Prohibited Activities', content: (<ul><li>Uploading or sharing illegal or harmful content.</li><li>Impersonating another person or entity.</li><li>Engaging in spamming or phishing activities.</li><li>Attempting to gain unauthorized access to the platform.</li></ul>) },
    { key: 'termination', title: 'Termination', content: 'We reserve the right to suspend or terminate your account at any time, with or without notice, for violations of these Terms or for any other reason. You may also terminate your account at any time by contacting us.' },
    { key: 'limitationOfLiability', title: 'Limitation of Liability', content: 'SHARESpere is provided "as is" without any warranties. We are not liable for any damages arising from your use of the platform, including but not limited to direct, indirect, incidental, or consequential damages.' },
    { key: 'governingLaw', title: 'Governing Law', content: 'These Terms are governed by the laws of Republic of Bangladesh. Any disputes arising from these Terms will be resolved in the courts located in Dhaka.' },
    { key: 'contact', title: 'Contact Us', content: (<p><strong>Email:</strong> support@sharesphere.com<br /><strong>Phone:</strong> +088-01**********<br /><strong>Address:</strong> 123 Terms Lane, Dhaka</p>) }
  ];

  return (
    <div className="terms-container">
      <h1 className="termspage-title">Terms of Service</h1>
      <div className="terms-sections">
        {sections.map(({ key, title, content }) => (
          <div className="tos-section" key={key}>
            <div className="termssection-header" onClick={() => toggleSection(key)}>
              <h2 className="termssection-title">{title}</h2>
              {openSection === key ? <FaChevronUp className="icon" /> : <FaChevronDown className="icon" />}
            </div>
            {openSection === key && <div className="termssection-content">{content}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsOfServicePage;
