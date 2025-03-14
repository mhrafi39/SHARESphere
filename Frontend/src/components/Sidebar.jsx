import React from 'react';
import { FaBoxOpen, FaWifi, FaBook, FaLaptop, FaCar } from 'react-icons/fa';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h2><FaBoxOpen /><span> Available Resources</span></h2>
      <ul>
        <li><FaWifi /><span>Free WiFi Access</span></li>
        <li><FaBook /> <span>Books for Learning</span></li>
        <li><FaLaptop /><span> Laptop for Rent</span></li>
        <li><FaCar /> <span>Carpooling Service</span></li>
      </ul>
      <button className="btn-view-all">View All</button>
    </div>
  );
};

export default Sidebar;