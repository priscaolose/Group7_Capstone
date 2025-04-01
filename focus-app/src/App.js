import React, { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, createTheme, useColorScheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

// Import your components
import "./App.css";
import Homepage from "./Homepage";
import Login from "./login";
import Registration from "./Registration";
import Dashboard from "./Components/Dashboard";
import EditTask from "./editTask";
import AddTask from "./addTask";
import ManageAccount from "./ManageAccount";
import { UserProvider } from "./Components/context";
import TimerPage from "./Components/timerPage";
import ViewTask from "./viewTask";
// import ThemeToggler from "./Components/ThemeToggler";

// Theme Toggle Component
function ThemeToggler({ mode, setMode }){ //this controls the toggle between the light and dark modes
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center", 
        bgcolor: "background.default",
        color: "text.primary",
        p: 2,
        height: "10px",
      }}
    >
      <FormControl> {/* FormControl is used to wrap the radio buttons toggle between light and dark */}
        {/* <FormLabel id="theme-toggle">Theme</FormLabel> */} {/* Optional label for the toggle */}
        <RadioGroup
          aria-labelledby="theme-toggle"
          name="theme-toggle"
          row
          value={mode}
          onChange={(event) => setMode(event.target.value)}
        >
          <FormControlLabel value="light" control={<Radio />} label="Light" /> 
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          {/* <FormControlLabel value="system" control={<Radio />} label="System" /> */}
          {/* i wanted to use the above line to change the theme  mode based on what the computer system was, but it wasnt working */}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

function App() {
  const [mode, setMode] = useState("dark"); // Default theme mode
  // Memoize theme so it updates dynamically
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // Uses "light" or "dark" mode dynamically
          background: {
            default: mode === "dark" ? "#121212" : "ffffff",
          },
        },
      }),
    [mode]
  );

  return (
    <UserProvider> 
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <ThemeToggler mode={mode} setMode={setMode} /> {/* ThemeToggler component to switch between light and dark mode */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addtask" element={<AddTask />} />
              <Route path="/timer" element={<TimerPage />} />
              <Route path="/manageaccount" element={<ManageAccount />} />
              <Route path="/editTask/:id" element={<EditTask />} />
              <Route path="/viewTask" element={<ViewTask />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
