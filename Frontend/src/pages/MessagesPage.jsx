import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import MessageItem from '../components/MessageItem';
import MessageLog from '../components/MessageLog';
import '../styles/Messages.css';
import prf from '../assets/prf.jpeg';

// Access API URL and Socket URL from environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000';
console.log("API URL: ", process.env.REACT_APP_API_URL);
console.log("Socket URL: ", process.env.REACT_APP_SOCKET_URL);
// Set up the socket connection (adjust URL if needed)
const socket = io(SOCKET_URL);

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Assuming these are the logged-in user's and the selected conversation's user IDs
  const userId = 'userId1';  // Replace with actual logged-in user's ID
  const otherUserId = 'userId2'; // Replace with the selected user's ID

  // Fetch messages for the conversation
  useEffect(() => {
    fetch(`${API_URL}/api/messages/${userId}/${otherUserId}`)
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error('Error fetching messages:', error));

    // Listen for incoming messages via WebSocket (real-time)
    socket.on('receiveMessage', (messageData) => {
      // Check if the message is for the current conversation
      if (
        (messageData.senderId === userId && messageData.receiverId === otherUserId) ||
        (messageData.senderId === otherUserId && messageData.receiverId === userId)
      ) {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      }
    });

    // Cleanup socket listener on component unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, [userId, otherUserId]);

  // Handle selecting a conversation from the message list
  const handleMessageClick = (msg) => {
    setSelectedConversation({
      sender: msg.sender,
      initialMessages: [
        { id: 1, sender: msg.sender, message: msg.message, time: msg.time },
      ],
    });
  };

  // Handle sending a new message (POST request)
  const handleSendMessage = () => {
    const messageData = {
      senderId: userId,
      receiverId: otherUserId,
      message: newMessage,
    };

    // Send message to backend via POST request
    fetch(`${API_URL}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Emit the message to WebSocket for real-time updates
        socket.emit('sendMessage', data);

        // Clear the message input after sending
        setNewMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
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
                  key={msg._id}
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

      {selectedConversation && (
        <div className="message-input-container">
          <input
            type="text"
            className="input-field"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
