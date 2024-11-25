import './App.css';
import Login from './login';
import Registration from './Registration';
import HomePage from './Homepage';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Route for the homepage */}
          <Route path="/" element={<HomePage />} />  {/* Root path */}
          
          {/* Login route */}
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          
          {/* Registration route */}
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
