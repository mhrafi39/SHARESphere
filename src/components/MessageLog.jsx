import React, { useState, useEffect, useRef } from 'react';
import { AiOutlinePaperClip, AiOutlinePhone } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import "../styles/MessageLog.css"
const MessageLog = ({ sender, initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: { name: 'You', profilePic: 'your-profile.jpg' },
        message: newMessage,
        time: 'Just now',
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleCall = () => {
    alert(`Calling ${sender.name}...`);
  };

  return (
    <div className="message-log">
      <div className="header">
        <div className="profile-info" onClick={() => setShowProfile(!showProfile)}>
          <img
            className="profile-pic"
            src={sender.profilePic}
            alt={sender.name}
          />
          <div className="profile-details">
            <h2>{sender.name}</h2>
            <p>Online</p>
          </div>
        </div>
        <button className="call-btn" onClick={handleCall}>
          <AiOutlinePhone />
        </button>
      </div>

      {showProfile && (
        <div className="profile-popup">
          <div className="profile-details">
            <img
              className="profile-pic-large"
              src={sender.profilePic}
              alt={sender.name}
            />
            <h3>{sender.name}</h3>
            <p>{sender.name}'s profile information...</p>
            <button className="close-btn" onClick={() => setShowProfile(false)}>Close</button>
          </div>
        </div>
      )}

      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender.name === 'You' ? 'sent' : 'received'}`}>
            <div className="message-bubble">
              <p>{msg.message}</p>
              <span className="time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} /> {/* This div ensures scroll stays at the bottom */}
      </div>

      <div className="message-input">
        <button className="attachment-btn">
          <AiOutlinePaperClip />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="send-btn">Send</button>
      </div>
    </div>
  );
};

export default MessageLog;