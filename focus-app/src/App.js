import "./App.css";
import Homepage from "./Homepage";
import Login from "./login";
import Registration from "./Registration";
import Dashboard from "./Components/Dashboard";
import AddTask from "./addTask";
import ManageAccount from "./ManageAccount"; // Import ManageAccount component
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { UserProvider } from "./Components/context";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);

  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/"
              element={
                <header className="App-header">
                  <Link to="/login" className="App-link">
                    Go to Login
                  </Link>
                  <Link to="/addtask" className="App-link"></Link>
                </header>
              }
            />
            <Route
              path="/login"
              element={
                <Login login={login} loggedIn={loggedIn} logout={logout} />
              }
            />
            <Route
              path="/registration"
              element={<Registration login={login} />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard loggedIn={loggedIn} logout={logout} />}
            />
            <Route
              path="/addtask"
              element={<AddTask loggedIn={loggedIn} logout={logout} />}
            />

            {/* Add route for ManageAccount */}
            <Route path="/manageaccount" element={<ManageAccount />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;