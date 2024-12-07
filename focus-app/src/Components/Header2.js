import React from 'react';
import logo from '../Images/logo.png'; 
import Navbar from './navBar'; // Import Navbar component
import '../CSSFolders/Header.css'; 
import { useNavigate} from 'react-router-dom';


  
const Header2 = () => {
    const navigate = useNavigate();
    const HandleLogout = () => {
        navigate('/login'); // Redirect to the login page
      };

    return (
      <header className="header">
        <img src={logo} alt="Logo" className="header-logo" /> 
        <div className="navAndLogOut"> 
        <Navbar /> 
        <input className="logOutButton" type="submit" value="LogOut" onClick={HandleLogout} />
        </div>
      </header>
    );  
};

export default Header2;
