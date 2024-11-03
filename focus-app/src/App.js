import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Homepage'; // Import your home page component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
