import React from 'react';
import NotificationItem from '../components/NotificationItem';
import { FaBell, FaComment, FaThumbsUp } from 'react-icons/fa';
import '../styles/Notifications.css';

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      icon: <FaBell />,
      message: 'You have a new message from Alice.',
      time: '10 minutes ago',
    },
    {
      id: 2,
      icon: <FaThumbsUp />,
      message: 'Michael liked your post.',
      time: '2 hours ago',
    },
    {
      id: 3,
      icon: <FaComment />,
      message: 'Sarah commented on your post.',
      time: '5 hours ago',
    },
  ];

  return (
    <div className="notifications-page">
      <h1>Notifications</h1>
      <div className="notifications-list">
        {notifications.map((notif) => (
          <NotificationItem key={notif.id} {...notif} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;