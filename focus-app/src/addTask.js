import React, { useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';  // Correct import
import { Grid2, Paper } from '@mui/material';
const useStyles = makeStyles((theme) =>({
    Grid2: {
        width : '100%',
        margin: '0px;'
    }
}));

const AddTask = (email) =>{
    const navigate = useNavigate();
    const classes = useStyles();
    return (

        <Grid2 container spacing ={2}className = {classes.Grid2}> 
        <Header />
            Add Task
        <Footer />
        </Grid2>
    )
}

export default AddTask;