import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box, Typography, Paper, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useLocation } from 'react-router-dom';

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
      main: '#1a73e8',
    },
    background: {
      default: '#f4f6f8',
    },
  },
});

function Dashboard() {
  const location = useLocation();
  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const [userFirstName, setUserFirstName] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch user data from backend API
  const getUserData = async (userID) => {
    try {
      const response = await fetch(`/api/getUser?userID=${userID}`);
      const data = await response.json();
      if (data.name) {
        setUserFirstName(data.name);
      } else {
        console.error('Error fetching user data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (location.state && location.state.firstName) {
      setUserFirstName(location.state.firstName);
    }

    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
        getUserData(loggedInUser.uid); // Fetch user data when logged in
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [location.state]);

  return (
    <div className="mainContainer">
      <Header />
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
                sx={{ color: theme.palette.primary.main, fontWeight: 'bold', textAlign: 'left' }}
              >
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
            {/* More content here */}
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
}

export default Dashboard;
