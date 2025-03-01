import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import FilterButtons from '../components/FilterButtons';
import Footer from '../components/Footer';
import PostDetails from '../components/PostDetails';
import { FaBars } from 'react-icons/fa';
import axios from 'axios'; // For making API requests

const HomePage = () => {
  const [filter, setFilter] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null); // State for selected post
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility
  const [posts, setPosts] = useState([]); // State to store fetched posts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/posts'); // Replace with your backend API endpoint
        setPosts(response.data); // Set fetched posts
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on the selected filter
  const filteredPosts = filter === 'all' 
    ? posts 
    : filter === 'community' 
      ? posts.filter(post => post.category === 'community') 
      : posts.filter(post => post.category === 'requested');

  // Handle post click to show post details
  const handlePostClick = (post) => {
    setSelectedPost(post); // Set selected post to display post details
  };

  // Go back to the list of posts
  const handleBackToPosts = () => {
    setSelectedPost(null); // Go back to the list of posts
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  // Display loading or error messages
  if (loading) {
    return <div className="loading-message">Loading posts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-page">
      <div className="main-content">
        {/* Sidebar Toggle Button */}
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Newsfeed Section */}
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
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <div key={post._id} onClick={() => handlePostClick(post)} className="post-container">
                      <Post {...post} />
                    </div>
                  ))
                ) : (
                  <div className="no-posts-message">No posts available.</div>
                )}
              </div>
            </>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;