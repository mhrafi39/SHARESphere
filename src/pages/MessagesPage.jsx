import React, { useState } from 'react';
import MessageItem from '../components/MessageItem';
import MessageLog from '../components/MessageLog';
import '../styles/Messages.css';

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

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
          <h1>Messages</h1>
          <div className="messages-list">
            {messages.map((msg) => (
              <div key={msg.id} onClick={() => handleMessageClick(msg)}>
                <MessageItem {...msg} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <MessageLog
          conversationId={selectedConversation.sender.name}
          sender={selectedConversation.sender}
          initialMessages={selectedConversation.initialMessages}
        />
      )}
    </div>
  );
};

export default MessagesPage;
