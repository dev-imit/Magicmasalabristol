import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img src="/masalamagic/navlogo.png" alt="Magic Masala" />
          <div className="nav-logo-text">
            <h1>Magic Masala Bristol</h1>
            <span>Catering Service</span>
          </div>
        </div>
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-contact-btn">
          <span>Contact Us</span>
        </a>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
