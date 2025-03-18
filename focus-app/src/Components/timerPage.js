import React, { useState, useEffect } from "react";
import { Typography, Box, Button, IconButton } from "@mui/material";
import { Add, Remove, PlayArrow, Pause, RestartAlt } from "@mui/icons-material";
import Header2 from "./Header2";
import Footer from "./Footer";

function TimerPage() {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        let newMinutes = prev.minutes;
        let newSeconds = prev.seconds - 1;

        if (newSeconds < 0) {
          if (newMinutes === 0) return prev; // Stop at 0
          newMinutes -= 1;
          newSeconds = 59;
        }

        return { minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const adjustTime = (type, amount) => {
    setTime((prev) => {
      let newValue = prev[type] + amount;
      if (newValue < 0) newValue = 0; // Prevent negative values
      return { ...prev, [type]: newValue };
    });
  };

  const resetTimer = () => {
    setTime({ minutes: 0, seconds: 0 });
    setIsRunning(false);
  };

  return (
    <div className="mainContainer">
  <Header2 />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to bottom, #FFFFFF, #FCEFEF, #E3EFFB, #FFFFFF)", // Soft gradient
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Minus Button for Minutes */}
        <IconButton onClick={() => adjustTime("minutes", -1)}>
          <Remove fontSize="large" />
        </IconButton>

        {/* Timer Display */}
        <Typography
          variant="h1"
          sx={{
            fontSize: "10rem",
            fontWeight: "bold",
            color: "#1E4976",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            margin: "0 10px",
          }}
        >
          {String(time.minutes).padStart(2, "0")}:
          {String(time.seconds).padStart(2, "0")}
        </Typography>

        {/* Plus Button for Minutes */}
        <IconButton onClick={() => adjustTime("minutes", 1)}>
          <Add fontSize="large" />
        </IconButton>
      </Box>

      {/* Second Adjustment Row */}
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <IconButton onClick={() => adjustTime("seconds", -5)}>
          <Remove fontSize="large" />
        </IconButton>

        <Typography variant="h6" sx={{ mx: 1, color: "#1E4976", fontSize: "1.5em"}}>Seconds</Typography>

        <IconButton onClick={() => adjustTime("seconds", 5)}>
          <Add fontSize="large" />
        </IconButton>
      </Box>
      
      {/*box for start/pause and reset buttons to be next to each other*/}
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

      {/* Start/Pause Button */}
      <Button
  variant="contained"
  sx={{
    backgroundColor: isRunning ? "#C62828" : "#1565C0", // Red for Pause, Blue for Start
    "&:hover": {
      backgroundColor: isRunning ? "#B71C1C" : "#0D47A1", // Darker shades on hover
    },
    color: "white",
    margin: "20px",
    fontSize: "1rem",
    padding: "10px 20px",
    borderRadius: "15px"
  }}
  startIcon={isRunning ? <Pause /> : <PlayArrow />}
  onClick={() => setIsRunning(!isRunning)}
>
  {isRunning ? "Pause" : "Start"}
</Button>

<Button
  variant="contained"
  sx={{
    backgroundColor: "#FF8F00", // Orange for Reset
    "&:hover": {
      backgroundColor: "#EF6C00", // Darker shade on hover
    },
    color: "white",
    margin: "20px",
    fontSize: "1rem",
    padding: "10px 20px",
    borderRadius: "15px"
  }}
  startIcon={<RestartAlt />}
  onClick={resetTimer}
>
  Reset
</Button>
    </Box>
    </Box>
    <Footer />
    </div>
  );
}

export default TimerPage;

