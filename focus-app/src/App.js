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
          <Route
            path="/"
            element={
              <header className="App-header">
                <Link to="/login" className="App-link">
                  Go to Login
                </Link>
                <Link to="/addtask" className="App-link">
                </Link>
              </header>
            }
          />
          <Route path="/login" element={<Login login={login} loggedIn={loggedIn} logout={logout}/>} />
          <Route path="/registration" element={<Registration login={login} />} />
          <Route path="/addtask" element={<AddTask email={email} />} />
          <Route path="/home" element={<Home login={login} loggedIn={loggedIn} logout={logout}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
