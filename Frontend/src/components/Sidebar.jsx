import React from 'react';
import { FaBoxOpen, FaWifi, FaBook, FaLaptop, FaCar } from 'react-icons/fa';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h2><FaBoxOpen /> Available Resources</h2>
      <ul>
        <li><FaWifi /> Free WiFi Access</li>
        <li><FaBook /> Books for Learning</li>
        <li><FaLaptop /> Laptop for Rent</li>
        <li><FaCar /> Carpooling Service</li>
      </ul>
      <button className="btn-view-all">View All</button>
    </div>
  );
};

export default Sidebar;