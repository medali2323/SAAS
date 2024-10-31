// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShapes } from 'react-icons/fa'; // Example icon, replace with the desired icon
import './navbar.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-icon">
        <FaShapes />
      </div>
      <div className="navbar-links">
        <NavLink to="/" className="navbar-link">Instances</NavLink>
        <NavLink to="/users" className="navbar-link">Users</NavLink>
        <NavLink to="/logs" className="navbar-link">Activity Logs</NavLink>
        <NavLink to="/backup" className="navbar-link">Backup</NavLink>
      </div>
      <div className="navbar-avatar">
        <img src="https://via.placeholder.com/40" alt="User Avatar" />
      </div>
    </div>
  );
};

export default Navbar;
