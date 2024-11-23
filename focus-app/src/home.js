import React, { useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useNavigate } from 'react-router-dom';
import {Grid2 } from '@mui/material';
import { TextField, Button, Typography, Box } from '@mui/material';

const AddTask = ({ email }) => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your task submission logic here
    console.log('Task to be added:', task);
    alert('Task has been successfully submitted')
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
        {/* Header */}
         <Grid2 xs={12}>
          <Header />
        </Grid2>

      <Grid2 container direction="row" minHeight="100vh">
        {/* Main Content */}
        <Grid2 xs={12} container justifyContent="center" alignItems="center" flex={1} p={2}>
          <Grid2 xs={12} md={12}>
            <Typography variant="h4" gutterBottom textAlign="center">
              Add New Task
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid2 container spacing={3}>
                <Grid2 xs={12}>
                  <TextField
                    fullWidth
                    label="Task Title"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <TextField
                    fullWidth
                    label="Task Description"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <TextField
                    fullWidth
                    label="Task DueDate"
                    name="dueDate"
                    type="date"
                    value={task.dueDate}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Add Task
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </Grid2>
        </Grid2>
      </Grid2>
        {/* Footer */}
        <Grid2 xs={12}>
          <Footer />
        </Grid2>

    </Box>
  );
};

export default AddTask;