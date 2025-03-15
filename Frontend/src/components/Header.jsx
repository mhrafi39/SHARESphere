import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaEnvelope, FaUser, FaSearch } from 'react-icons/fa';
import axios from 'axios';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery) {
      try {
        // Fetch posts from the backend API
        const apiUrl = 'http://localhost:4000/api/products';
        const response = await axios.get(`${apiUrl}?title=${encodeURIComponent(trimmedQuery)}`);
        const searchResults = response.data.myData;

        // Navigate to the PostSearch page and pass the search results as state
        navigate('/post-search', { state: { searchResults, searchQuery: trimmedQuery } });
      } catch (err) {
        console.error('Error fetching posts:', err);
        // Navigate to the PostSearch page with empty results
        navigate('/post-search', { state: { searchResults: [], searchQuery: trimmedQuery } });
      }
    } else {
      // Navigate to the PostSearch page with empty results if the query is empty
      navigate('/post-search', { state: { searchResults: [], searchQuery: '' } });
    }
  };

  // Function to handle logo click
  const handleLogoClick = () => {
    navigate('/home'); // Navigate to the homepage
  };

  return (
    <header>
      {/* Logo with click handler */}
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        SHARESphere
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search posts..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
      <nav>
        <ul>
          <li><NavLink to="/home"><FaHome /> <span>Home</span></NavLink></li>
          <li><NavLink to="/create-post"><FaPlus /> <span>Post</span></NavLink></li>
          <li><NavLink to="/messages"><FaEnvelope /> <span>Messages</span></NavLink></li>
          <li><NavLink to="/profile"><FaUser /> <span>Profile</span></NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;