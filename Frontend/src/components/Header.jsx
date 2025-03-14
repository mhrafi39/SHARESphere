import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaEnvelope, FaUser, FaSearch } from 'react-icons/fa';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery) {
      navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <header>
      <div className="logo">SHARESphere</div>
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