import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleNav = () => setIsOpen(!isOpen);
  
  const closeNav = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeNav();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav ref={navbarRef} className="navbar">
      <div className="navbar-brand">
        <button
          className={`navbar-burger ${isOpen ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={toggleNav}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      
      <div className={`navbar-menu ${isOpen ? "is-active" : ""}`}>
        <div className="navbar-end">
          <Link to="/account" className="navbar-item" onClick={closeNav}>
            <i className="fa-solid fa-user"></i> Account
          </Link>
          
          <Link to="/manageaccount" className="navbar-item" onClick={closeNav}>
            <i className="fa-solid fa-list-check"></i> Manage Account
          </Link>
          
          <Link to="/Dashboard" className="navbar-item" onClick={closeNav}>
            <i className="fa-solid fa-right-from-bracket"></i>Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
