import React, { useState } from 'react';
import '../styles/settings.css';

const SettingsPage = () => {
  // State for notification preferences
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  // State for privacy settings
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showActivity: false,
    shareResourcesPublicly: true,
  });

  // State for profile settings
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    bio: 'I love sharing resources!',
    profileVisibility: 'public',
  });

  // State for password change
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
  });

  // State for resource sharing preferences
  const [resourceSharing, setResourceSharing] = useState({
    autoApproveRequests: false,
    allowComments: true,
    maxResourceUploadSize: 100, // in MB
  });

  // State for theme customization
  const [theme, setTheme] = useState({
    mode: 'light',
    accentColor: '#4CAF50',
  });

  // Handlers for notification preferences
  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Handlers for privacy settings
  const handlePrivacyChange = (type) => {
    setPrivacy((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Handlers for profile settings
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handlers for password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handlers for resource sharing preferences
  const handleResourceSharingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setResourceSharing((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handlers for theme customization
  const handleThemeChange = (e) => {
    const { name, value } = e.target;
    setTheme((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      {/* Profile Settings Section */}
      <div className="settings-section">
        <h2>Profile Settings</h2>
        <div className="setting-option">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleProfileChange}
            />
          </label>
        </div>
        <div className="setting-option">
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleProfileChange}
            />
          </label>
        </div>
        <div className="setting-option">
          <label>
            Bio:
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
            />
          </label>
        </div>
        <div className="setting-option">
          <label>
            Profile Visibility:
            <select
              name="profileVisibility"
              value={profile.profileVisibility}
              onChange={handleProfileChange}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends-only">Friends Only</option>
            </select>
          </label>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="settings-section">
        <h2>Change Password</h2>
        <div className="setting-option">
          <label>
            Current Password:
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <div className="setting-option">
          <label>
            New Password:
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button className="save-password-btn">Change Password</button>
      </div>

      {/* Notification Preferences Section */}
      <div className="settings-section">
        <h2>Notification Preferences</h2>
        {Object.keys(notifications).map((key) => (
          <div className="setting-option" key={key}>
            <label>
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={() => handleNotificationChange(key)}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
            </label>
          </div>
        ))}
      </div>

      {/* Privacy Settings Section */}
      <div className="settings-section">
        <h2>Privacy Settings</h2>
        {Object.keys(privacy).map((key) => (
          <div className="setting-option" key={key}>
            <label>
              <input
                type="checkbox"
                checked={privacy[key]}
                onChange={() => handlePrivacyChange(key)}
              />
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
          </div>
        ))}
      </div>

      {/* Theme Customization Section */}
      <div className="settings-section">
        <h2>Theme Customization</h2>
        <div className="setting-option">
          <label>
            Theme Mode:
            <select name="mode" value={theme.mode} onChange={handleThemeChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
        <div className="setting-option">
          <label>
            Accent Color:
            <input
              type="color"
              name="accentColor"
              value={theme.accentColor}
              onChange={handleThemeChange}
            />
          </label>
        </div>
      </div>

      {/* Account Management Section */}
      <div className="settings-section">
        <h2>Account Management</h2>
        <button className="delete-account-button">Delete Account</button>
      </div>
    </div>
  );
};

export default SettingsPage;
