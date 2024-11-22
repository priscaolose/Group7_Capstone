
// src/Home.js
import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';

const Home = ({loggedIn,logout}) => {
    console.log("loggined",loggedIn)
    return (
        <div>
            <Header loggedIn={loggedIn} logout={logout}/>
            <h1 className="homeHeading">Welcome to the Home Page!</h1>
            <p>This is a sample home page content.</p>
            <Footer />
        </div>
    );
};

export default Home;
