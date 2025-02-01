import React from 'react';
import MessageItem from '../components/MessageItem';
import '../styles/Messages.css';

const MessagesPage = () => {
  const messages = [
    {
      id: 1,
      sender: { name: 'Alice Brown', profilePic: 'prf.jpeg' },
      message: 'Hi, are you still offering the laptop?',
      time: '10 minutes ago',
    },
    {
      id: 2,
      sender: { name: 'Michael Smith', profilePic: 'prf.jpeg' },
      message: 'I can lend you my laptop. When do you need it?',
      time: '2 hours ago',
    },
  ];

  return (
    <div className="messages-page">
      <h1>Messages</h1>
      <div className="messages-list">
        {messages.map((msg) => (
          <MessageItem key={msg.id} {...msg} />
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;