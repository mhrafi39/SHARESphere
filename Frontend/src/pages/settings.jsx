import React, { useState, useEffect } from "react";
import "../styles/settings.css";

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
    firstName: "John",
    lastName: "Doe",
    bio: "I love sharing resources!",
  });

  // State for password change
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  // State for theme customization
  const [theme, setTheme] = useState({
    mode: "light",
    accentColor: "#4CAF50",
  });

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Fetch user data from the backend
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setProfile({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        bio: data.user.bio,
      });
      setNotifications(data.user.notifications || { email: true, sms: false, push: true });
      setPrivacy(data.user.privacy || { showProfile: true, showActivity: false, shareResourcesPublicly: true });
      setTheme(data.user.theme || { mode: "light", accentColor: "#4CAF50" });
    } catch (error) {
      alert("Error fetching user data. Please try again.");
    }
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

  // Handlers for theme customization
  const handleThemeChange = (e) => {
    const { name, value } = e.target;
    setTheme((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save profile settings
  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update profile");
      }

      const data = await response.json();
      alert("Profile updated successfully!");
      setProfile(data.user); // Update state with the new data
    } catch (error) {
      alert(error.message || "Failed to update profile. Please try again.");
    }
  };

  // Change password
  const changePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwords),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to change password");
      }

      alert("Password changed successfully!");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (error) {
      alert(error.message || "Failed to change password. Please try again.");
    }
  };

  // Save notification preferences
  const saveNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(notifications),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update notifications");
      }

      alert("Notification preferences updated successfully!");
    } catch (error) {
      alert(error.message || "Failed to update notifications. Please try again.");
    }
  };

  // Save privacy settings
  const savePrivacy = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/privacy", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(privacy),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update privacy settings");
      }

      alert("Privacy settings updated successfully!");
    } catch (error) {
      alert(error.message || "Failed to update privacy settings. Please try again.");
    }
  };

  // Save theme customization
  const saveTheme = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/theme", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(theme),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update theme");
      }

      alert("Theme updated successfully!");
    } catch (error) {
      alert(error.message || "Failed to update theme. Please try again.");
    }
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
        <button className="save-btn" onClick={saveProfile}>
          Save Profile
        </button>
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
        <button className="save-btn" onClick={changePassword}>
          Change Password
        </button>
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
        <button className="save-btn" onClick={saveNotifications}>
          Save Notifications
        </button>
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
              {key.replace(/([A-Z])/g, " $1")}
            </label>
          </div>
        ))}
        <button className="save-btn" onClick={savePrivacy}>
          Save Privacy Settings
        </button>
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
        <button className="save-btn" onClick={saveTheme}>
          Save Theme
        </button>
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