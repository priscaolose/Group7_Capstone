import React, { useEffect, useState } from 'react';
import Header from './Header';
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
import { useLocation } from 'react-router-dom'; // Import useLocation for accessing state


// Custom Theme
const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", sans-serif',
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
    if (location.state && location.state.firstName) {
      setUserFirstName(location.state.firstName); // If navigating from registration, use passed first name
    }

    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [location.state]);

  return (
    <div className='mainContainer'>
      <Header />
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
                {user ? userFirstName : 'Guest'}
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
              }}
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
  );
}

export default Dashboard;
