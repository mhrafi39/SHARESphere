import React from 'react';

const MessageItem = ({ sender, message, time }) => {
  return (
    <div className="message-item">
      <img src={sender.profilePic} alt={sender.name} className="message-profile-pic" />
      <div className="message-content">
        <span className="message-sender">{sender.name}</span>
        <p className="message-text">{message}</p>
        <span className="message-time">{time}</span>
      </div>
    </div>
  );
};

export default MessageItem;