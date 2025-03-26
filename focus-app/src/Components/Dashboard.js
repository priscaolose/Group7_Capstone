import React, { useEffect, useState } from "react";
import Header2 from "./Header2";
import Footer from "./Footer";
import {
  Box,
  Typography,
  Paper,
  useMediaQuery,
  Tabs,
  Tab,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useUser } from "./context";
import NoteSection from "./NoteSection";
import { Timestamp } from "firebase/firestore";

// Custom Theme
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: "#1059a2",
    },
    background: {
      default: "#f4f6f8",
    },
  },
});

function Dashboard() {
  const isSmallScreen = useMediaQuery("(max-width: 900px)");
  //const [userFirstName, setUserFirstName] = useState(null);
  //const [user, setUser] = useState(null);
  const { user, tasks } = useUser();
  const [tabIndex, setTabIndex] = useState(1);

  console.log("User", user);

  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [randomQuote, setRandomQuote] = useState("");
  let count = 0;

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const t = new Date();
  t.setHours(0, 0, 0, 0);
  const dayStart = Timestamp.fromDate(t);
  const endDay = new Date();
  endDay.setHours(23, 59, 59, 999);
  const eD = Timestamp.fromDate(endDay);
  let filterTasks;

    filterTasks = tasks.filter((task) => {
      const tEndTime = task.dueDate;
      if (!tEndTime) return false;
      if (tabIndex === 0) {
        return tEndTime > eD;
      } else if (tabIndex === 1) {
        return tEndTime >= dayStart && tEndTime <= eD;
      } else if (tabIndex === 2) {
        return tEndTime < dayStart;
      }
      return false;
    });

  const quotes = [
    "Its always a great time to take the first step.",
    "Believe you can and you’re halfway there. – Theodore Roosevelt",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt",
    "Your limitation—it’s only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Hard work beats talent when talent doesn’t work hard.",
    "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
    "Dream big and dare to fail. – Norman Vaughan",
    "Act as if what you do makes a difference. It does. – William James",
    "Keep on going, and the chances are that you will stumble on something, perhaps when you are least expecting it. I never heard of anyone ever stumbling on something sitting down. – Charles F. Kettering",
  ];

  // Select a random quote when the component loads
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);

  // Live Clock Update
  useEffect(() => {
    const updateClock = () => {
      const today = new Date();
      let hours = today.getHours();
      const minutes = checkTime(today.getMinutes());
      const seconds = checkTime(today.getSeconds());

      hours = checkHour(hours);
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = `Focus - ${currentTime}`;
  }, [currentTime]);

  function checkTime(i) {
    return i < 10 ? `0${i}` : i;
  }

  function checkHour(hours) {
    return hours > 12 ? hours - 12 : hours;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="mainContainer">
        <Header2 />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            minHeight: "auto",
            px: isSmallScreen ? 2 : 4,
            py: 1,
            backgroundColor: "white",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
              maxWidth: "1200px",
              width: "100%",
            }}
          >
            {/* Left Column */}
            <Box sx={{ display: "grid", gap: 4 }}>
              {/* Welcome Section */}
              <Paper
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  background: "white",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderColor: theme.palette.primary.main,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mt: 1,
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {/* display user's first name */}
                  {user?.firstName || "Guest"}
                </Typography>
              </Paper>

              {/* Today's Tasks Section */}
              <Paper
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  background: "white",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  minHeight: "50vh",
                }}
              >
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                  <Tab label="Past" />
                  <Tab label="Today" />
                  <Tab label="Future" />
                </Tabs>

                <Typography>
                  <h2>Your Tasks</h2>
                </Typography>

                {filterTasks.length > 0 ? (
                  filterTasks.map((task, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", color: "#1059a2" }}
                        textAlign={"left"}
                      >
                        {task.taskName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#333" }}
                        textAlign={"left"}
                      >
                        {task.taskDescription}
                      </Typography>
                      <hr
                        style={{
                          backgroundColor: "gray",
                          height: "1px",
                          border: "none",
                        }}
                      />
                    </Box>
                  ))
                ) : (
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", textAlign: "center", mt: 2 }}
                  >
                    You have no tasks. Click on Add Task to add some!
                  </Typography>
                )}
              </Paper>
            </Box>

            {/* Center Column (Timer Section*/}
            <Box sx={{ display: "grid", gap: 4 }}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "16px",
                  background: "white",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  p: 4,
                  textDecoration: "none",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  {currentTime}
                </Typography>

                <Typography
                  variant="body1"
                  component={Link}
                  to="/timer"
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: "1.25rem",
                    mt: 2,
                  }}
                >
                  set timer
                </Typography>

                <Typography
                  variant="body1"
                  component={Link}
                  to="/addTask"
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: "1.25rem",
                    mt: 2,
                  }}
                >
                  add task
                </Typography>

                <Typography
                  variant="body1"
                  component={Link}
                  to="/viewTask"
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: "1.25rem",
                    mt: 2,
                  }}
                >
                  view tasks
                </Typography>
              </Paper>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  background: "white",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar />
                </LocalizationProvider>
              </Paper>
            </Box>

            {/* Right Column */}
            <Box sx={{ display: "grid", gap: 4 }}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  background: "white",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  Reminder:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    mt: 1,
                    lineHeight: 1.5,
                  }}
                >
                  {randomQuote}
                </Typography>
              </Paper>
              <Box sx={{ display: "grid", gap: 4 }}>
                <NoteSection /> {/* Uses the NoteSection component */}
              </Box>
            </Box>
          </Box>
        </Box>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
