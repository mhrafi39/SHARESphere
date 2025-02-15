import React from 'react';

const MessageItem = ({ sender, message, time }) => {
  return (
    <div className="message-item">
      <img src={sender.profilePic} alt={sender.name} className="profile-pic" />
      <div className="message-details">
        <div className="message-header">
          <span className="sender-name">{sender.name}</span>
          <span className="message-time">{time}</span>
        </div>
        <p className="message-preview">{message}</p>
      </div>
    </div>
  );
};

export default MessageItem;