import React from 'react';
import { FaBoxOpen, FaWifi, FaBook, FaLaptop, FaCar } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2><FaBoxOpen /> Available Resources</h2>
      <ul>
        <li><FaWifi /> Free WiFi Access</li>
        <li><FaBook /> Books for Learning</li>
        <li><FaLaptop /> Laptop for Rent</li>
        <li><FaCar /> Carpooling Service</li>
      </ul>
      <button className="btn-view-all">View All</button>
    </aside>
  );
};

export default Sidebar;