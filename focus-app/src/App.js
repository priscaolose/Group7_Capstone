import './App.css';
import Login from './login';
import Registration from './Registration';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Home route displays the React logo and a link to Login */}
          <Route
            path="/"
            element={
              <header className="App-header">
                <img src={require('./logo.svg').default} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
                {/* Link to the Login page */}
                <Link to="/login" className="App-link">
                  Go to Login
                </Link>
              </header>
            }
          />
          {/* Login route */}
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
=======
// App.js
import React from 'react';
import HomePage from './Homepage';

const App = () => {
    return <HomePage />;
};
export default App;
