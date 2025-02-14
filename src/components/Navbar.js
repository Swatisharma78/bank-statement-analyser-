// Navbar.js
import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo Section */}
        <div className="logo-container">
          <img 
            src="https://i.postimg.cc/6qc1p0MR/1737015506698-removebg-preview.pnghttps://i.postimg.cc/prTgw4B4/1737015506698.jpg" // अपना logo path डालें
            alt="Logo" 
            className="logo"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <a href="/" className="nav-item">Home</a>
          <a href="/about" className="nav-item">About</a>
          <a href="/contact" className="nav-item">Contact</a>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <a href="/" className="mobile-nav-item">Home</a>
          <a href="/about" className="mobile-nav-item">About</a>
          <a href="/contact" className="mobile-nav-item">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;