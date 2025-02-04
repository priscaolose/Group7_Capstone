import React, { useState } from 'react';
import Header2 from './Components/Header2';
import Footer from './Components/Footer';
import './CSSFolders/AddTask.css'; 
import { useNavigate,useLocation } from 'react-router-dom';
import { Grid2, Box, TextField, Button, InputAdornment, IconButton, Typography } from '@mui/material';
import { Clear, TaskSharp } from '@mui/icons-material';
import { addTask} from './Api/createTask';


const ViewTask = ({ loggedIn, logout }) =>
{
    return (
        <Box sx={{ flexGrow: 1 }}>
          {/* Header */}
          <Grid2 xs={12}>
            <Header2 />
          </Grid2>
        View Task
          {/* Footer */}
          <Grid2 xs={12}>
            <Footer />
          </Grid2>
        </Box>
      );
}

export default ViewTask;