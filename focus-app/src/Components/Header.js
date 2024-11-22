import React from 'react';
import logo from '../Images/logo.png'; 
import Navbar from './navBar'; // Import Navbar component
import '../CSSFolders/Header.css'; 

const Header = ({ loggedIn, logout }) => {
  if (loggedIn === true) {
    return (
      <header className="header">
        <img src={logo} alt="Logo" className="header-logo" /> 
        <div className="navAndLogOut"> 
        <Navbar /> 
        <input className="logOutButton" type="submit" value="LogOut" onClick={logout} />
        </div>
       
      </header>
    );  
  } else {
    return (
      <header className="header">
        <img src={logo} alt="Logo" className="header-logo" />
      </header>
    );  
  }
};

export default Header;
