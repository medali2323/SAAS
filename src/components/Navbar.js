// Navbar.js
import React from 'react';
import './navbar.css';

import { FaShapes } from 'react-icons/fa'; // Example icon, replace with the desired icon
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-icon">
        <FaShapes />
      </div>
      <div className="navbar-links">
        <button className="navbar-link">Instances</button>
        <button className="navbar-link">Users</button>
        <button className="navbar-link">Activity Logs</button>
        <button className="navbar-link">Backup</button>
      </div>
      <div className="navbar-avatar">
        <img src="path_to_avatar_image.jpg" alt="User Avatar" />
      </div>
    </div>
  );
};

export default Navbar;
