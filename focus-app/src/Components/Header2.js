import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook for navigation
import logo from '../Images/logo.png'; 
import Navbar from './navBar'; // Import Navbar component
import '../CSSFolders/Header.css'; 
import Homepage from '../Homepage';

const Header2 = () => {
  const navigate = useNavigate();

  const HandleLogout = () => {
    // Optional: Add any logout logic here (e.g., clearing auth tokens or session)
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo"
        className="header-logo"
        onClick={() => navigate('/Homepage')} // Navigate to the home page when logo is clicked
        style={{ cursor: 'pointer' }} // Optional: Show pointer cursor
      />
      <div className="navAndLogOut">
        <Navbar />
        <input
          className="logOutButton"
          type="submit"
          value="Log Out"
          onClick={HandleLogout} // Call HandleLogout on click
        />
      </div>
    </header>
  );
};

export default Header2;
