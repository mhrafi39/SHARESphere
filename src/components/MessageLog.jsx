import React, { useState, useEffect, useRef } from 'react';
import { AiOutlinePaperClip, AiOutlinePhone, AiOutlineInfoCircle, AiOutlineClose } from 'react-icons/ai';
import "../styles/MessageLog.css";

const MessageLog = ({ sender, initialMessages, onBack }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [file, setFile] = useState(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() || file) {
      const newMsg = {
        id: messages.length + 1,
        sender: { name: 'You', profilePic: 'your-profile.jpg' },
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        file: file ? { name: file.name, type: file.type, url: URL.createObjectURL(file) } : null,
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      setFile(null);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleCall = () => {
    alert(`Calling ${sender.name}...`);
  };

  return (
    <div className="message-log-container">
      <div className="chat-header">
        <button className="back-button" onClick={onBack}>←</button>
        <div className="sender-info">
          <img src={sender.profilePic} alt={sender.name} className="profile-pic" />
          <span className="sender-name">{sender.name}</span>
        </div>
        <div className="header-icons">
          <AiOutlinePhone className="icon" onClick={handleCall} />
          <AiOutlineInfoCircle className="icon" onClick={() => setShowProfile(!showProfile)} />
        </div>
      </div>

      <div className={`profile-sidebar ${showProfile ? 'open' : ''}`}>
        <div className="sidebar-header">
          <AiOutlineClose className="close-icon" onClick={() => setShowProfile(false)} />
          <h3>Profile Information</h3>
        </div>
        <div className="profile-info">
          <img src={sender.profilePic} alt={sender.name} className="profile-info-pic" />
          <h3>{sender.name}</h3>
          <p>Status: {sender.status || "Hey there! I am using WhatsApp."}</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender.name === 'You' ? 'sent' : 'received'}`}>
            {msg.sender.name !== 'You' && (
              <img src={msg.sender.profilePic} alt={msg.sender.name} className="message-profile-pic" />
            )}
            <div className="message-content">
              {msg.file && (
                <div className="file-attachment">
                  {msg.file.type.startsWith('image/') ? (
                    <img src={msg.file.url} alt={msg.file.name} className="file-image" />
                  ) : (
                    <a href={msg.file.url} download={msg.file.name} className="file-link">
                      {msg.file.name}
                    </a>
                  )}
                </div>
              )}
              <p className="message-text">{msg.message}</p>
              <span className="message-time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="chat-input">
        <label htmlFor="file-upload" className="file-upload-label">
          <AiOutlinePaperClip className="icon" />
        </label>
        <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessageLog;