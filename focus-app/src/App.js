import './App.css';
import Login from './login';
import Home from './home';
import Registration from './Registration';
import Header from './Components/Header'; // Import Header component
import AddTask from './addTask';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Home route displays the React logo and a link to Login */}
          <Route
            path="/"
            element={
              <header className="App-header">
                {/* Link to the Login page, placed inside the element of this route */}
                <Link to="/login" className="App-link">
                  Go to Login
                </Link>
                <Link to="/addtask" className="App-link">
                  Go to Add  Task
                </Link>
              </header>
            }
          />
          {/* Login route */}
          <Route path="/login" element={<Login login={login} loggedIn={loggedIn} />} /> 
          <Route path="/registration" element={<Registration login={login} />} />          <Route path="/addtask" element={<AddTask email={email} />} />
          <Route path="/home" element={<Home />} /> {/* Redirect here after successful login */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
