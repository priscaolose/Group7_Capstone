import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Login from './login';
import Registration from './Registration';
import HomePage from './Homepage';

// Create a theme with custom typography
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif', // Set the default font for Typography
  },
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Ensures consistent baseline styling across the app */}

          {/* Common Header */}
          <Header />

          <Routes>
            {/* Route for the homepage */}
            <Route path="/" element={<HomePage />} /> {/* Root path */}
            
            {/* Login route */}
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            
            {/* Registration route */}
            <Route path="/registration" element={<Registration />} />

            {/* Dashboard route (only accessible after logging in) */}
            {loggedIn && (
              <Route path="/dashboard" element={<Dashboard />} />
            )}
          </Routes>

          {/* Common Footer */}
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
