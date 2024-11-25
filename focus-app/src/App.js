import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Create a theme with custom typography
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif', // Set the default font for Typography
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent baseline styling across the app */}
      <Header />
      <Dashboard />
    </ThemeProvider>
      <Footer />
    </div>
  );
}


export default App;
