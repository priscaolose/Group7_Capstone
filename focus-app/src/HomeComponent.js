import React from 'react';

import './HomeComponent.css';
import logo from './img/logo-4-processed-1.png'; // Adjust the import path as needed
import focusImage from './img/FOCUS.png'; // Adjust the import path as needed

const Home = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <div className="desktop">
        <header className="header">
          <img className="logo" src={logo} alt="Logo" />
          <div className="navigation-pill-list">
            <div className="navigation-pill" />
          </div>
        </header>
        <div className="main-section">
          <div className="group">
            <img className="FOCUS" src={focusImage} alt="Focus" />
            <p className="text-wrapper">Welcome to the evolution of</p>
            <div className="overlap-group">
              <a href="main.html">
                <button className="button">
                  <div className="state-layer">
                    <div className="label-text">Get started</div>
                  </div>
                </button>
              </a>
            </div>
            <p className="div" id="slogan">
              In a world of frenzy, let’s find our focus.
            </p>
          </div>
          <footer className="footer">
            <p>2024 Focus. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
