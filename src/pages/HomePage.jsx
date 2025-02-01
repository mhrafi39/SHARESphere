import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import FilterButtons from '../components/FilterButtons';
import Footer from '../components/Footer';
import RightSidebar from '../components/RightSidebar';
import PostDetails from '../components/PostDetails'; // Import the PostDetails component
import prf from '../assets/prf.jpeg'
import p from '../assets/p.jpeg'

const HomePage = () => {
  const [filter, setFilter] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null); // State for selected post

  const posts = [
    {
      id: 1,
      author: { name: 'John Doe', profilePic: prf },
      time: '2 hours ago',
      title: 'Looking for a Laptop',
      content: 'Hi everyone, I need a laptop for a few days. Please let me know if anyone is willing to lend it.',
      type: 'Lend',
      category: 'requested',
    },
    {
      id: 2,
      author: { name: 'Sarah Lee', profilePic: prf },
      time: '4 hours ago',
      title: 'Need Books on Web Development',
      content: 'Looking for books or resources on web development. If anyone has recommendations, let me know!',
      type: 'Requested',
      category: 'requested',
    },
    {
      id: 3,
      author: { name: 'Michael Smith', profilePic: prf },
      time: '6 hours ago',
      title: 'Need a Ride to Downtown',
      content: "I'm looking for someone to share a ride to downtown tomorrow morning. Anyone available?",
      type: 'Requested',
      category: 'requested',
    },
    {
      id: 4,
      author: { name: 'Alice Brown', profilePic: prf },
      time: '3 hours ago',
      title: 'Sharing Free Books',
      content: 'Sharing free books for learning. Feel free to pick them up if you need them!',
      type: 'Free',
      category: 'community',
      image: p,
    },
    {
      id: 5,
      author: { name: 'Eve Green', profilePic: prf },
      time: '5 hours ago',
      title: 'Offering Free Tech Support',
      content: 'If anyone needs help with their computer or software issues, feel free to reach out. I am happy to assist!',
      type: 'Free',
      category: 'community',
    },
    {
      id: 6,
      author: { name: 'Jake White', profilePic: prf },
      time: '7 hours ago',
      title: 'Laptop for Rent',
      content: 'Renting out my laptop for a few days. Perfect for anyone who needs one for work or study.',
      type: 'Rent',
      category: 'community',
      price: '$20/day',
    },
  ];

  const filteredPosts = filter === 'all' 
    ? posts 
    : filter === 'community' 
      ? posts.filter(post => post.category === 'community') 
      : posts.filter(post => post.category === 'requested');

  const handlePostClick = (post) => {
    setSelectedPost(post); // Set selected post to display post details
  };

  const handleBackToPosts = () => {
    setSelectedPost(null); // Go back to the list of posts
  };

  return (
    <div className="home-page">
      <div className="main-content">
        <Sidebar />
        <section className="newsfeed">
          {selectedPost ? (
            <PostDetails post={selectedPost} onBack={handleBackToPosts} /> // Show post details if a post is selected
          ) : (
            <>
              <div className="filter-options">
                <h2>Filter Posts</h2>
                <FilterButtons onFilterChange={setFilter} />
              </div>
              <div className="post-section">
                {filteredPosts.map((post) => (
                  <div key={post.id} onClick={() => handlePostClick(post)} className="post-container">
                    <Post {...post} />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
        <RightSidebar />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
