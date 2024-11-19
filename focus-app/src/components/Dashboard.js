import React from 'react';
import { Box, Typography, Paper, Button, LinearProgress } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';



function Dashboard() {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 2, p: 2, backgroundColor: '#f0f4f8', minHeight: '100vh'}}>
        
     {/* Left Column with Two Items */}
     <Box sx={{ display: 'grid', gridTemplateRows: '1fr', gap: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontSize: '2.5rem', color: '#093966', width: '200px',fontWeight: 'bold'}}>Welcome Back </Typography> 
          <Typography variant="h6" sx={{ fontSize: '2.5rem', color: '#000000', width: '200px',fontWeight: 'bold', }}>[UserName]</Typography> 
        </Paper>

        <Paper sx={{ p: 3, height: '550px'}}>
        <Typography variant="subtitle1" sx={{ fontSize: '4.5rem', color: '#1270B0'}} mt={2}>Today's Tasks</Typography>
          
        </Paper>

        <Paper sx={{ p: 3, height: '300px'}}>
          <Typography variant="subtitle1" sx={{ fontSize: '4.5rem', color: '#1270B0'}}>Next Up:</Typography>
          {/* Additional content can go here */}
        </Paper>
      </Box>


         {/* Center Section: Timer and Calendar */}
         <Box sx={{ p: 2, display: 'grid', gridTemplateRows: '1fr 1fr', gap: 3, textAlign: 'center' }}>
                {/* Timer */}
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h1" sx={{ fontSize: '10rem', fontWeight: 'bold', color: '#093966', paddingTop: '100px'}}>00:00</Typography>
                    <Typography variant="h6" sx={{ fontSize: '5rem', color: '#093966', width: "100%"}}>task Name</Typography>
                </Paper>

                {/* Calendar */}
                <Paper sx={{ p: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    paddingTop: '50px',
                    width: '100%',
                    //maxWidth: '600px', // Adjust for desired width
                    mx: 'auto', // Center horizontally
                }}
            >
                <DateCalendar
                    sx={{
                        width: '100%',
                        color: '#00000',
                        fontSize: '20px',
                        '.MuiPickersDay-root': { fontSize: '1.5rem'}, // Increase day size
                        '.MuiTypography-root': { fontSize: '1.5rem' }, // Adjust header font size
                    }}
                />
            </Box>
        </LocalizationProvider>
    </Paper>
          </Box>

  {/* Right Sidebar */}

  <Box sx={{ display: 'grid', gridTemplateRows: '1fr', gap: 3 }}>
        <Paper sx={{  height: 'auto' }}>
        <Typography variant="h2" sx={{ color: '#1270B0', fontSize: '2.5rem' }}>reminder: </Typography>
        </Paper>

        <Paper sx={{ height: '950px'}}>
        <Typography variant="subtitle1" sx={{ fontSize: '3.5rem', color: '#1270B0'}} mt={2}>Notes</Typography>
          
        </Paper>
        
  </Box>


      {/* Footer */}
      <Box sx={{ gridColumn: 'span 3', textAlign: 'center', mt: 4 }}>
        <Button href="/about">About</Button>
        <Button href="/privacy">Privacy Policy</Button>
      </Box> 
    </Box>
    );
}

export default Dashboard