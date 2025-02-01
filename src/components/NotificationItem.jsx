import React from 'react';

const NotificationItem = ({ icon, message, time }) => {
  return (
    <div className="notification-item">
      <div className="notification-icon">{icon}</div>
      <div className="notification-content">
        <p className="notification-message">{message}</p>
        <span className="notification-time">{time}</span>
      </div>
    </div>
  );
};

export default NotificationItem;