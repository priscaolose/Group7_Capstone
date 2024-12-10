import React, { useEffect, useState } from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import AddTask from '../addTask';
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
import { useLocation } from 'react-router-dom'; // Import useLocation for accessing state
import { Link } from 'react-router-dom';

// Custom Theme
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif', // Use Poppins as the font
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
      main: '#1a73e8', // the blue you had before
    },
    background: {
      default: '#f4f6f8',
    },
  },
});

function Dashboard() {
  const location = useLocation(); // Access location state
  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const [userFirstName, setUserFirstName] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async (userID) => {
      try {
        const response = await fetch(`/api/getUser?userID=${userID}`);
        if (response.ok) {
          const data = await response.json();
          setUserFirstName(data.name); // Update state with the user's first name
        } else {
          console.error('Failed to fetch user data:', response.statusText);
          setUserFirstName('Guest'); // Fallback if the API call fails
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserFirstName('Guest'); // Fallback in case of error
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
        fetchUserData(loggedInUser.uid); // Fetch user data from the API using the user's ID
      } else {
        setUser(null);
        setUserFirstName('Guest');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className='mainContainer'>
        <Header2 />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start', // Adjust to start from the top
            minHeight: '100vh',
            px: isSmallScreen ? 2 : 4,
            py: 1,
            backgroundColor: 'white',
            overflowY: 'auto', // Enables scrolling when content exceeds viewport
          }}
        >
          {/* Main Content */}
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
                  background: 'linear-gradient(#FFF1F1, #E2EAF1)',
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
                  {userFirstName}
                </Typography>
              </Paper>

              {/* Today's Tasks Section */}
              <Paper
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'linear-gradient(#FFF1F1, #E2EAF1)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  minHeight: '50vh',
                }}
              >
                <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                  Today's Tasks
                </Typography>
              </Paper>
            </Box>

            {/* Center Column */}
            <Box sx={{ display: 'grid', gap: 4 }}>
              <Paper
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '16px',
                  background: 'linear-gradient(#FFF1F1, #E2EAF1)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  p: 4,
                  textDecoration: 'none',
                
                }}
                component={Link} // Link to the Add Task page
                to= "/addTask" // Route to navigate to  Add Task page
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: '#333',
                    fontWeight: '300',
                  }}
                >
                  00:00
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: '1.25rem',
                    mt: 2,
                  }}
                >
                  Add task here
                </Typography>
              </Paper>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'linear-gradient(#FFF1F1, #E2EAF1)',
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
                  background: 'linear-gradient(#FFF1F1, #E2EAF1)',
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
                  background: 'linear-gradient(#FFF1F1, #E2EAF1)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  minHeight: '50vh',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  Notes
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
