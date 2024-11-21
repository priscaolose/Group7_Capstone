import React from 'react';
import logo from '../Images/logo.png'; 
import '../CSSFolders/Header.css'; 

const Header = (loggedIn,logout) => {
  if (loggedIn ) {
    return (
      <header className="header">
             <img src={logo} alt="Logo" className="header-logo" /> {/* Logo image */}
             <nav className="navbar">
                <ul>
                  <li><a href="/dashboard">Dashboard</a></li>
                  <li><a href="/tasks">Your Tasks</a></li>
                  <li>
                  <div className="inputButtonContainer">
                      <input className="inputButton" type="submit" value="Sign in" />
                  </div>  
                    </li>            
                </ul>
              </nav>
        </header>
    );  
  }
  else if (logout) {
    return (
      <header className="header">
             <img src={logo} alt="Logo" className="header-logo" /> {/* in here i want to have a situation where when they click on it,it shouodl log out*/}
      </header>
    );  
  }
 
};

export default Header;
