import React from 'react';
import logo from '../Images/logo.png'; 
import '../CSSFolders/Header.css'; 

const Header = () => {
  return (
    <header className="header">
           <img src={logo} alt="Logo" className="header-logo" /> {/* Logo image */}
    </header>
  );
};

export default Header;
