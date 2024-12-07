import React, { useEffect, useState } from 'react';
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

// Create a theme with custom typography
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

function Dashboard() {
  //const UserName = 'Antonette';
  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const [notes, setNotes] = useState('');
  const [user, setUser] = useState(null); //to store logged in user

  useEffect(() => { 
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        console.log(loggedInUser);
        setUser(loggedInUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); //cleanup the listener when the component is unmounted
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffff',
          px: isSmallScreen ? 2 : 4,
          pt: 3,
          minHeight: '100vh', // Ensure full-height
        }}
      >
        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 2fr 1fr' },
            gap: 3,
            py: 3,
          }}
        >
          {/* Left Column */}
          <Box sx={{ display: 'grid', gap: 3 }}>
            {/* Welcome Section */}
            <Paper
              sx={{
                height: '20vh',
                p: 3,
                background: 'linear-gradient(#FFF1F1, #E2EAF1)',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                textAlign: 'left',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: '#1a4e8a',
                  fontWeight: '500',
                  fontSize: isSmallScreen ? '2.5em' : '3em',
                  fontFamily: '"Poppins", sans-serif',
                  padding: '10px'
                }}
              >
                Welcome <br /> Back
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 1,
                  color: '#1a4e8a',
                  fontSize: isSmallScreen ? '3em' : '4.5em',
                  fontWeight: 'bold'
                }}
              >
                {
                  user ? user.email : "Guest"
                }
                {/*user ? user.displayName || "User" : "Guest"}*/}
              </Typography>
            </Paper>
            {/* Tasks Section */}
            <Paper
              sx={{
                p: 3,
                background: 'linear-gradient(#FFF1F1, #E2EAF1)',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                height: '70vh',
              }}
            >
              <Typography variant="h6" sx={{ color: '#1a4e8a', fontSize: '2.5em' }}>
                Today's Tasks
              </Typography>
            </Paper>
            <Paper
              sx={{
                p: 3,
                background: 'linear-gradient(#FFF1F1, #E2EAF1)',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                height: '15vh',
              }}
            >
              <Typography variant="h6" sx={{ color: '#1a4e8a', fontSize: '2.5em' }}>
                Next Up:
              </Typography>
            </Paper>
          </Box>

          {/* Center Column */}
          <Box sx={{ display: 'grid', gap: 3 }}>
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column', // Stack items vertically
                justifyContent: 'center', // Center items vertically
                alignItems: 'center', // Center items horizontally
                borderRadius: '16px',
                background: 'linear-gradient(#FFF1F1, #E2EAF1)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                height: isSmallScreen ? 'auto' : 'auto', // Adjust height for larger screens
                padding: '30px', // Padding for a comfortable layout
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: '#1a4e8a',
                  fontWeight: '300',
                  fontSize: isSmallScreen ? '16em' : '20em',
                }}
              >
                00:00
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: '#1a4e8a', fontFamily: '"Poppins", sans-serif', fontSize: isSmallScreen ? '3em' : '3.5em' }}
              >
                task name
              </Typography>
            </Paper>
            <Paper
              sx={{
                p: 3,
                borderRadius: '16px',
                background: 'linear-gradient(#FFF1F1, #E2EAF1)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                height: 'auto',
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>
            </Paper>
          </Box>

          {/* Right Column */}
          <Box sx={{ display: 'grid', gap: 3 }}>
            <Paper
              sx={{
                p: 3,
                background: 'linear-gradient(#FFF1F1, #E2EAF1)',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ color: '#1a4e8a', fontSize: '2.5em' }}>
                Reminder:
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '2rem', color: '#333', paddingTop: '25px' }}>
                It's always a great time to take the first step.
              </Typography>
            </Paper>
            <Paper
              sx={{
                p: 3,
                background: 'linear-gradient(#FFF1F1, #E2EAF1)',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#1a4e8a',
                  fontSize: '2.5em',
                  mb: 2,
                  height: '60vh', // Adjust height for better spacing
                }}
              >
                Notes
              </Typography>
              {/* <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{
                  width: '100%',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: '"Poppins", sans-serif',
                  padding: '8px',
                }}
                placeholder="Write your notes here..."
              /> */}
            </Paper>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;