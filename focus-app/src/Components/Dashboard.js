import React, { useEffect, useState } from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import {
  Box,
  Typography,
  Paper,
  useMediaQuery,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Firestore imports
import { db } from '../firebase/firebaseConfig'; // Firestore config
import { Link,useLocation} from 'react-router-dom';
import { useUser } from './context';
import TextField from '@mui/material/TextField';
import { Notes } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

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
      main: '#1059a2',
    },
    background: {
      default: '#f4f6f8',
    },
  },
});


function Dashboard() {
  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const [userFirstName, setUserFirstName] = useState(null);
  const location = useLocation(); 
  const email = location.state?.email; 
  //const [user, setUser] = useState(null);
  const { user } = useUser();
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);

  /*useEffect(() => {
    const fetchUserData = async (userID) => {
      try {
        const userRef = doc(db, "Users", userID); // Access user document in Firestore
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserFirstName(userDoc.data().firstName); // Set user's first name from Firestore
        } else {
          console.error("User document not found");
          setUserFirstName("Guest"); // display for missing first name
        }
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
        setUserFirstName("Guest"); // display for errors
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
        fetchUserData(loggedInUser.uid); // Fetch user data when logged in
      } else {
        setUser(null);
        setUserFirstName("Guest");
      }
    });

    return () => unsubscribe();
  }, []);*/
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
  }, []); //cleanup on unmount

  function checkTime(i) {
    return i < 10 ? `0${i}` : i;
  } // Add a leading zero to single-digit numbers

  function checkHour(hours){ // setting time for 12 hour format
    return hours > 12 ? hours - 12 : hours;
  }

  const handleNote = () => {
    if (note.trim() !== ''){
      setNotesList([...notesList, note]);
      setNote('');
    }
  };

  const handleDelete = (index) => {
    setNotesList(notesList.filter((note, i) => i !== index));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='mainContainer'>
        <Header2 />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: '100vh',
            px: isSmallScreen ? 2 : 4,
            py: 1,
            backgroundColor: 'white',
            overflowY: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
              maxWidth: '1200px',
              width: '100%',
            }}
          >
            {/* Left Column */}
            <Box sx={{ display: 'grid', gap: 4 }}>
              {/* Welcome Section */}
              <Paper
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', textAlign: 'left' }}>
                  Welcome Back
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mt: 1,
                    color: '#333',
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}
                >
                  {/* display user's first name */}
                  {user?.firstName || "Loading..."} 
                </Typography>
              </Paper>

              {/* Today's Tasks Section */}
              <Paper
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  minHeight: '50vh',
                }}
              >
                <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                  Tasks
                </Typography>
                <Typography component="div">
                <ul style={{ paddingLeft: '1.5rem', margin: 0}}>
                <li style={{ paddingLeft: '1.5rem', margin: 0 , paddingTop: '2em', color: '#333'}}>
                  <Typography variant="body1"></Typography>
                </li>
                <li style={{ paddingLeft: '1.5rem', margin: 0 , paddingTop: '2em', color: '#333'}}>
                  <Typography variant="body1"></Typography>
                </li>
                <li style={{ paddingLeft: '1.5rem', margin: 0 , paddingTop: '2em', color: '#333'}}>
                  <Typography variant="body1"></Typography>
                </li>
                <li style={{ paddingLeft: '1.5rem', margin: 0 , paddingTop: '2em', color: '#333'}}>
                  <Typography variant="body1"></Typography>
                </li>
                <li style={{ paddingLeft: '1.5rem', margin: 0 , paddingTop: '2em', color: '#333'}}>
                  <Typography variant="body1"></Typography>
                </li>
                <li style={{ paddingLeft: '1.5rem', margin: 0 , paddingTop: '2em', color: '#333'}}>
                  <Typography variant="body1"></Typography>
                </li>
                </ul>
                  </Typography>
              </Paper>
            </Box>

            {/* Center Column (Timer Section*/}
            <Box sx={{ display: 'grid', gap: 4 }}>
              <Paper
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  p: 4,
                  textDecoration: 'none',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: '#333',
                    fontWeight: 'bold',
                  }}
                >
                  {currentTime}  
                </Typography>
                <Typography
                  variant="body1"
                  component={Link} to = "/addTask"
                  state={{ email: email }}
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: '1.25rem',
                    mt: 2,
                  }}
                >
                  add task 
                </Typography>

                <Typography
                  variant="body1"
                  component={Link} to = "/viewTask" 
                  state={{ email: email }}
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: '1.25rem',
                    mt: 2,
                  }}
                >
                  view tasks 
                </Typography>
              </Paper>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar />
                </LocalizationProvider>
              </Paper>
            </Box>

            {/* Right Column */}
            <Box sx={{ display: 'grid', gap: 4 }}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
                    color: '#333',
                    mt: 1,
                    lineHeight: 1.5,
                  }}
                >
                  It's always a great time to take the first step.
                </Typography>
              </Paper>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  minHeight: '50vh',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: "white",
                    mb: 2,
                  }}
                >
                  Notes

                 <Box sx={{ width: "auto", maxWidth: '100%', height: '100'}}>
                <TextField fullWidth label="Enter notes" id="fullWidth" />
                </Box>
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Box>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
