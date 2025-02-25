import React, { useState } from 'react';
import '../styles/Profile.css';
import Post from '../components/ProfileFeed'; // Import the Post component
import PostDetails from '../components/PostDetails'; // Import the PostDetails component
import prf from '../assets/prf.jpeg';
import p from '../assets/p.jpeg';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const user = {
    name: 'John Doe',
    profilePic: prf,
    bio: 'A passionate developer who loves sharing resources and helping others.',
    email: 'john.doe@example.com',
    joined: 'January 2023',
    rating: 4.5, // User rating out of 5
    communities: ['React Developers', 'JavaScript Enthusiasts', 'Open Source Contributors'], // List of communities
  };

  // Sample posts data (5 posts)
  const posts = [
    {
      id: 1,
      author: { name: 'John Doe', profilePic: prf },
      time: '2h ago',
      title: 'Looking for a React Developer',
      content: 'We are hiring a React developer with 2+ years of experience. Interested candidates can reach out!',
      type: 'Job',
      category: 'community',
    },
    {
      id: 2,
      author: { name: 'John Doe', profilePic: prf },
      time: '1d ago',
      title: 'Free JavaScript Resources',
      content: 'Sharing a list of free JavaScript resources for beginners. Check it out!',
      type: 'Free',
      category: 'resource',
      image: p,
    },
    {
      id: 3,
      author: { name: 'John Doe', profilePic: prf },
      time: '3d ago',
      title: 'New React Feature: Concurrent Mode',
      content: 'React has introduced Concurrent Mode, which allows rendering to be interruptible. Exciting times ahead!',
      type: 'News',
      category: 'community',
    },
    {
      id: 4,
      author: { name: 'John Doe', profilePic: prf },
      time: '5d ago',
      title: 'CSS Grid vs Flexbox',
      content: 'A detailed comparison of CSS Grid and Flexbox. Which one should you use for your next project?',
      type: 'Article',
      category: 'resource',
      image: 'css-grid-vs-flexbox.jpg',
    },
    {
      id: 5,
      author: { name: 'John Doe', profilePic: prf },
      time: '1w ago',
      title: 'Open Source Contribution Tips',
      content: 'Thinking of contributing to open source? Here are some tips to get started and make meaningful contributions.',
      type: 'Guide',
      category: 'community',
    },
  ];

  const [selectedPost, setSelectedPost] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false); // State to toggle sidebar visibility

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackToPosts = () => {
    setSelectedPost(null);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar); // Toggle sidebar visibility
  };

  const closeSidebar = () => {
    setShowSidebar(false); // Close the sidebar when clicked outside
  };

  return (
    <div className="profile-page" onClick={closeSidebar}>
      {selectedPost ? (
        <PostDetails post={selectedPost} onBack={handleBackToPosts} />
      ) : (
        <>
          {/* Hamburger Icon for Mobile */}
          <div className="hamburger-icon" onClick={(e) => { e.stopPropagation(); toggleSidebar(); }}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          {/* Middle Section: Posts and Photos */}
          <div className={`middle-section ${showSidebar ? 'sidebar-open' : ''}`}>
            <div className="profile-header">
              <div className="profile-banner"></div>
              <div className="profile-info">
                <img src={user.profilePic} alt="Profile" className="profile-pic" />
                <h1>{user.name}</h1>
                <p className="profile-bio">{user.bio}</p>
                <div className="profile-stats">
                  <span><strong>Email:</strong> {user.email}</span>
                  <span><strong>Joined:</strong> {user.joined}</span>
                  <span><strong>Rating:</strong> {user.rating} ★</span>
                </div>
              </div>
            </div>

            <div className="photos-section">
              <h2>Photos</h2>
              <div className="photos-grid">
                {posts
                  .filter((post) => post.image) // Only posts with images
                  .map((post) => (
                    <img
                      key={post.id}
                      src={post.image}
                      alt={`Post by ${post.author.name}`}
                      className="user-photo"
                    />
                  ))}
              </div>
            </div>

            <div className="posts-section">
              <h2>Posts</h2>
              {posts.map((post) => (
                <div key={post.id} onClick={() => handlePostClick(post)} className="post-container">
                  <Post
                    author={post.author}
                    time={post.time}
                    title={post.title}
                    content={post.content}
                    type={post.type}
                    image={post.image}
                    category={post.category}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Settings and Privacy - Now as Sidebar */}
          <div className={`right-section ${showSidebar ? 'show' : ''}`}>
            <h2>Settings & Privacy</h2>
            <ul className="settings-list">
            <li><Link to = "/settings">Settings</Link></li>
              <li><Link to = "/PrivacyPolicy">Privacy Policy</Link></li>
              <li><Link to = "/TermsofService">Terms Of Service</Link></li>
              <li><Link to = "/Help&Support">Help & Support</Link></li>
            </ul>

            {/* Logout Button */}
            <button className="logout-button" onClick={() => alert('Logged out!')}>
              Log Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
