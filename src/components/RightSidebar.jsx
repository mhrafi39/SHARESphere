import React from 'react';
import { FaFilter, FaMicrochip, FaBook, FaBus, FaHome, FaTags, FaGift, FaHandHoldingUsd, FaExchangeAlt, FaHandshake } from 'react-icons/fa';

const RightSidebar = () => {
  return (
    <aside className="right-sidebar">
      <h2><FaFilter /> Resource Categories</h2>
      <ul>
        <li><FaMicrochip /> Technology</li>
        <li><FaBook /> Books</li>
        <li><FaBus /> Transportation</li>
        <li><FaHome /> Housing</li>
      </ul>

      <h2><FaTags /> Resource Types</h2>
      <ul>
        <li><FaGift /> Free</li>
        <li><FaHandHoldingUsd /> Rent</li>
        <li><FaExchangeAlt /> Swap</li>
        <li><FaHandshake /> Lend</li>
      </ul>
    </aside>
  );
};

export default RightSidebar;