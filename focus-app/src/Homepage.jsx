// src/Homepage.jsx
import React from 'react';
import './Homepage.css'; 
import logo from './img/logo-4-processed-1.png'; // Adjust the import path as needed
import focusImage from './img/FOCUS.png'; 

const Homepage = () => {
  return (
    <div className="desktop">
      <header className="header">
        <img className="logo" src={logo} alt="Logo" />
        <div className="navigation-pill-list">
          <div className="navigation-pill"></div>
        </div>
      </header>
      <div className="main-section">
        <div className="group">
            <p className="text-wrapper">welcome to the evolution of</p>
            
            <img className="FOCUS" src={focusImage} alt="Focus" />
            <p className="div" id="slogan">In a world of frenzy, let’s find our focus.</p>
          <div className="overlap-group">
            <a href="main.html">
              <button className="button">
                <div className="state-layer">
                  <div className="label-text">Get started</div>
                </div>
              </button>
            </a>
          </div>
          
        </div>
        <footer className="footer">
          <p>2024 Focus. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
