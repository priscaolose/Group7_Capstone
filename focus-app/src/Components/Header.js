import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook for navigation
import logo from '../Images/Focus-8.png'; // Import the logo image
import Navbar from './navBar'; // Import Navbar component
import '../CSSFolders/Header.css'; 
import Homepage from '../Homepage';

const Header = ({ loggedIn, logout }) => {
  const navigate = useNavigate(); // Correctly call the useNavigate hook inside the component

  const handleLogoClick = () => {
    navigate('/Homepage'); // Navigate to the home page
  };

  if (loggedIn) {
    return (
      <header className="header">
        <img
          src={logo}
          alt="Logo"
          className="header-logo"
          onClick={handleLogoClick} // Add click handler for logo navigation
          style={{ cursor: 'pointer' }} // Optional: Show pointer cursor
          sizes='500px'
        />
        <div className="navAndLogOut">
          <Navbar />
          <input
            className="logOutButton"
            type="submit"
            value="Log Out"
            onClick={logout} // Handle logout
          />
        </div>
      </header>
    );
  } else {
    return (
      <header className="header">
        <img
          src={logo}
          alt="Logo"
          className="header-logo"
          onClick={handleLogoClick} // Add click handler for logo navigation
          style={{ cursor: 'pointer' }} // Optional: Show pointer cursor
        />
      </header>
    );
  }
};

export default Header;
