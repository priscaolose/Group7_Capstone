import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  AppBar,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
//import { useNavigate } from 'react-router-dom'; // For navigation
import logo from './logo.png';

function Dashboard() {
  const [UserName, setUserName] = useState('User');
  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const [notes, setNotes] = useState('');
  //const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userID = 'RW5fePHZRRICIRju5tVp';
        const response = await fetch(`/api/getUser?userID=${userID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserName(data.name || 'User'); // Set default if name is missing
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gap: 2,
        backgroundColor: '#fffff',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#e2e9f1',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          marginBottom: '5px',
        }}
      >
        <Toolbar sx={{ justifyContent: 'left' }}>
          <Box>
            <img
              src={logo}
              alt="Logo"
              style={{
                height: '60px',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 2fr 1fr' },
          gap: 2,
          p: 2,
        }}
      >
        {/* Left Column */}
        <Box sx={{ display: 'grid', gap: 3, }}>
          <Paper sx={{ p: 3, backgroundImage: 'linear-gradient(to bottom, #FFF1F1, #E2EAF1)' }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '7.5rem', md: '6.5rem' },
                
                fontWeight: 'bold',
                lineHeight: '1.2',
                textAlign: 'left',
                paddingTop: '70px',
                color: '#093966'
              }}
            >
              Welcome{'\n'}Back
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '3.5rem', md: '4.5rem' },
                color: '#000',
                fontWeight: 'bold',
                mt: 2,
                textAlign: 'left',
              }}
            >
              {UserName}
            </Typography>
          </Paper>
          <Paper sx={{ p: 3 , backgroundImage: 'linear-gradient(to bottom, #FFF1F1, #E2EAF1)'}}>
            <Typography
              variant="h6"
              sx={{ fontSize: '4rem', color: '#1270B0' }}
            >
              Today's Tasks
            </Typography>
          </Paper>
          <Paper sx={{ p: 3, backgroundImage: 'linear-gradient(to bottom, #FFF1F1, #E2EAF1)'}}>
            <Typography
              variant="h6"
              sx={{ fontSize: '4rem', color: '#1270B0' }}
            >
              Next Up:
            </Typography>
          </Paper>
        </Box>

        {/* Center Section */}
        <Box sx={{ display: 'grid', gap: 3 }}>
          {/* Timer */}
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              borderRadius: '16px',
              backgroundImage: 'linear-gradient(to bottom, #FFF1F1, #E2EAF1)',
              cursor: 'pointer',
            }}
            //onClick={() => navigate('/timer')} // Navigate to Timer.js
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '7rem', sm: '10rem', md: '12rem' },
                fontWeight: '300',
                color: '#093966',
              }}
            >
              00:00
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '2rem', sm: '4rem', md: '6rem' },
                color: '#1270B0',
              }}
            >
              Task Name
            </Typography>
          </Paper>

          {/* Calendar */}
          <Paper
            sx={{
              p: 3,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              borderRadius: '16px',
              cursor: 'pointer',
              backgroundImage: 'linear-gradient(to bottom, #FFF1F1, #E2EAF1)'
            }}
            //onClick={() => navigate('/calendar')} // Navigate to Calendar
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </Paper>
        </Box>

        {/* Right Column */}
        <Box sx={{ display: 'grid', gap: 3 }}>
          <Paper sx={{ p: 3, backgroundImage: 'linear-gradient(to bottom, #FFF1F1, #E2EAF1)' }}>
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, color: '#1270B0' }}
            >
              Reminder:
            </Typography>
          </Paper>
          <Paper sx={{ p: 3, backgroundImage: 'linear-gradient(to bottom, #FFF1F1, #E2EAF1)' }}>
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, color: '#1270B0' }}
            >
              Notes
            </Typography>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                height: '200px',
                fontSize: '1rem',
                marginTop: '1rem',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                color: 'black'
              }}
              placeholder="Write your notes here..."
            />
          </Paper>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: 'center',
          p: 2,
          backgroundColor: '#8AAEC6',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <Button href="/about" sx={{ color: '#000' }}>
          About
        </Button>
        <Button href="/privacy" sx={{ color: '#000' }}>
          Privacy Policy
        </Button>
      </Box>
    </Box>
  );
}

export default Dashboard;
