import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaPlus, FaEnvelope, FaUser, FaSearch } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <div className="logo">SHARESphere</div>
      <div className="search-container">
        <input type="text" placeholder="Search resources..." className="search-bar" />
        <button className="search-btn"><FaSearch /></button>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <FaHome /> <span className="nav-text">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-post"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <FaPlus /> <span className="nav-text">Post</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/messages"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <FaEnvelope /> <span className="nav-text">Messages</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <FaUser /> <span className="nav-text">Profile</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;