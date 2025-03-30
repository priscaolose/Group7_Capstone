import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Add, Remove, PlayArrow, Pause, RestartAlt } from "@mui/icons-material";
import Header2 from "./Header2";
import Footer from "./Footer";

function TimerPage() {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const audioRef = useRef(null);
  // const [audioLoaded, setAudioLoaded] = useState(false);

  // Load audio when component mounts
  useEffect(() => {
    // Try to load the audio file
    if (audioRef.current) {
      audioRef.current.load();
      // Add event listener to check if audio is loaded
      // audioRef.current.addEventListener('canplaythrough', () => {
      //   setAudioLoaded(true);
      //   console.log("Audio loaded successfully");
      // });
      
      // Add error listener
      audioRef.current.addEventListener('error', (e) => {
        console.error("Audio loading error:", e);
      });
    }
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        let newMinutes = prev.minutes;
        let newSeconds = prev.seconds - 1;

        if (newSeconds < 0) {
          if (newMinutes === 0) {
            // Time's up - show alert and play sound
            setIsRunning(false);
            setOpenAlert(true);
            playAlarmSound();
            return prev; // Stop at 0
          }
          newMinutes -= 1;
          newSeconds = 59;
        }

        return { minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Function to play alarm sound with user interaction handling
  const playAlarmSound = () => {
    if (audioRef.current) {
      // Reset the audio to the beginning
      audioRef.current.currentTime = 0;
      
      // Try to play with user interaction handling
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio playing successfully");
          })
          .catch(error => {
            console.error("Audio play failed:", error);
            // If autoplay is prevented, we can notify the user
            console.log("Browser blocked autoplay. Click OK to play sound.");
          });
      }
    } else {
      console.error("Audio element not found");
    }
  };

  // Function to stop alarm sound
  const stopAlarmSound = () => {
    if (audioRef.current) {
      // Pause the audio
      audioRef.current.pause();
      // Reset to beginning
      audioRef.current.currentTime = 0;
      console.log("Audio stopped");
    }
  };


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

  const handleCloseAlert = () => {
    setOpenAlert(false);
    stopAlarmSound(); // Stop the alarm sound
    
  };

  // // // Test sound function
  // const testSound = () => {
  //   playAlarmSound();
  // };

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
          background: "linear-gradient(to bottom, #FFFFFF, #FCEFEF, #E3EFFB, #FFFFFF)",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "10rem",
            fontWeight: "bold",
            color: "#1E4976",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          {String(time.minutes).padStart(2, "0")}:
          {String(time.seconds).padStart(2, "0")}
        </Typography>

        {/* Minute Adjustment Row */}
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
          <IconButton onClick={() => adjustTime("minutes", -1)}>
            <Remove fontSize="large" />
          </IconButton>
          <Typography variant="h6" sx={{ mx: 1, color: "#1E4976", fontSize: "1.3em" }}>
            Minutes
          </Typography>
          <IconButton onClick={() => adjustTime("minutes", 1)}>
            <Add fontSize="large" />
          </IconButton>
        </Box>

        {/* Second Adjustment Row */}
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
          <IconButton onClick={() => adjustTime("seconds", -1)}>
            <Remove fontSize="large" />
          </IconButton>
          <Typography variant="h6" sx={{ mx: 1, color: "#1E4976", fontSize: "1.3em" }}>
            Seconds
          </Typography>
          <IconButton onClick={() => adjustTime("seconds", 1)}>
            <Add fontSize="large" />
          </IconButton>
        </Box>

        {/* Control Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: isRunning ? "#C62828" : "#1565C0",
              "&:hover": { backgroundColor: isRunning ? "#B71C1C" : "#0D47A1" },
              color: "white",
              margin: "10px",
              fontSize: "1rem",
              padding: "10px 20px",
              borderRadius: "15px",
            }}
            startIcon={isRunning ? <Pause /> : <PlayArrow />}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF8F00",
              "&:hover": { backgroundColor: "#EF6C00" },
              color: "white",
              margin: "10px",
              fontSize: "1rem",
              padding: "10px 20px",
              borderRadius: "15px",
            }}
            startIcon={<RestartAlt />}
            onClick={resetTimer}
          >
            Reset
          </Button>

          {/* Test Sound Button */}
          {/* <Button
            variant="outlined"
            sx={{
              borderColor: "#1E4976",
              color: "#1E4976",
              margin: "10px",
              fontSize: "1rem",
              padding: "10px 20px",
              borderRadius: "15px",
            }}
            onClick={testSound}
          >
            Test Sound
          </Button> */}
        </Box>

        {/* Audio element with fallback options */}
        <audio 
          ref={audioRef} 
          preload="auto"
        >
          {/* Try local path first */}
          <source src="/Users/priscaolose/Downloads/mixkit-tick-tock-clock-timer-1045.wav" type="audio/mpeg" /> 
          {/* Fallback to public URL if local path fails */}
          <source src="https://assets.mixkit.co/active_storage/sfx/1045/1045.wav" type="audio/wav" />
           Your browser does not support the audio element.
        </audio>

        {/* Audio status indicator (for debugging) */}
        {/* <Typography variant="caption" sx={{ mt: 1, color: audioLoaded ? "green" : "red" }}>
          {audioLoaded ? "Audio loaded ✓" : "Audio loading..."}
        </Typography> */}

        {/* Alert Dialog when timer ends */}
        <Dialog
          open={openAlert}
          onClose={handleCloseAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            sx: {
              borderRadius: '15px',
              padding: '10px',
              width: 'auto',
              minWidth: '300px',
            }
          }}
        >
          <DialogTitle 
            id="alert-dialog-title"
            sx={{ 
              textAlign: 'center', 
              fontSize: '1.8rem', 
              color: '#C62828',
              fontWeight: 'bold'
            }}
          >
            Time's Up!
          </DialogTitle>
          <DialogContent>
            <Typography 
              variant="h6" 
              sx={{ textAlign: 'center', fontSize: '1.2rem' }}
            >
              Your timer has finished.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
            <Button 
              onClick={handleCloseAlert} 
              variant="contained"
              sx={{
                backgroundColor: '#1565C0',
                '&:hover': { backgroundColor: '#0D47A1' },
                borderRadius: '10px',
                padding: '8px 20px'
              }}
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Footer />
    </div>
  );
}

export default TimerPage;