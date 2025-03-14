import React, { useState } from 'react';
import MessageItem from '../components/MessageItem';
import MessageLog from '../components/MessageLog';
import '../styles/Messages.css';
import prf from '../assets/prf.jpeg';


const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const messages = [
    {
      id: 1,
      sender: { name: 'Alice Brown', profilePic: prf, status: 'Online' },
      message: 'Hi, are you still offering the laptop?',
      time: '10:15 AM',
    },
    {
      id: 2,
      sender: { name: 'Michael Smith', profilePic: prf, status: 'Offline' },
      message: 'I can lend you my laptop. When do you need it?',
      time: 'Yesterday',
    },
    {
      id: 3,
      sender: { name: 'John Doe', profilePic: prf, status: 'Online' },
      message: 'Sure, let’s meet tomorrow.',
      time: '2 days ago',
    },
  ];

  const handleMessageClick = (msg) => {
    setSelectedConversation({
      sender: msg.sender,
      initialMessages: [
        { id: 1, sender: msg.sender, message: msg.message, time: msg.time },
      ],
    });
  };

  return (
    <div className="messages-page">
      {!selectedConversation ? (
        <>
          <div className="messages-header">
            <h1>Chats</h1>
          </div>
          <div className="messages-container">
            <div className="messages-list">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="message-item-wrapper"
                  onClick={() => handleMessageClick(msg)}
                >
                  <MessageItem {...msg} />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <MessageLog
          sender={selectedConversation.sender}
          initialMessages={selectedConversation.initialMessages}
          onBack={() => setSelectedConversation(null)}
        />
      )}
    </div>
  );
};

export default MessagesPage;