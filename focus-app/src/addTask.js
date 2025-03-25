import React, { useState } from 'react';
import Header2 from './Components/Header2';
import Footer from './Components/Footer';
import './CSSFolders/AddTask.css'; 
import { useNavigate} from 'react-router-dom';
import { Grid2, Box, TextField, Button, InputAdornment, IconButton, Typography,Dialog,DialogTitle,DialogContent,DialogActions } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { addTask } from './Api/createTask';
import ColorDropdown from './ColorDropdown'; 
import PriorityDropdown from './taskPriority';
import { useUser } from './Components/context';

const AddTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  //const email = user?.email;
  const uid = localStorage.getItem('uid')
  console.log("local storage",localStorage)
  console.log("Uid",uid)
  const [errors, setErrors] = useState({}); // Single object to hold all error messages
  const [isFocused, setIsFocused] = useState(false);
  const [titleIsFocused, setTitleIsFocused] = useState(false);
  //console.log("email,",email)
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: '',
    priority: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const TaskDialog = ({ open, onClose }) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Task Creation</DialogTitle>
        <DialogContent>
              A New Task has been successfully created!
        </DialogContent>
        <DialogActions>
          <Button 
          sx={{
            padding: '8px 1px',
            backgroundColor: '#8AAEC6',
            cursor: 'pointer',
            color: 'white',
            width: '10px',
            fontSize: '16px',
            }}
          onClick={onClose}>
          Ok</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleCancel = () => {
    setTask({
      title: '',
      description: '',
      dueDate: '',
      category: '',
      priority: '',
    });
    setErrors({});
  };
  
  const handleDialogClose = () => {
    setIsOpen(false); 
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous error messages
    setErrors({});

    // Create an errors object
    const newErrors = {};
    if (!task.title) {
      newErrors.title = 'Title is required.';
    }
    if (task.title && task.title.length > 75) {
        newErrors.title = 'Title must be less than 75 characters';
    }
    if (task.description && task.description.length > 150) {
        newErrors.description = 'Description must be less than 150 characters';
    }
    if (!task.dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    //addTask(email, task.title, task.description, task.dueDate, new Date(), task.category, task.priority);
    addTask(uid, task.title, task.description, task.dueDate, new Date(), task.category, task.priority);
      setTask({
        title: '',
        description: '',
        dueDate: '',
        category: '',
        priority: '',
      })
      setIsOpen(true); 
  };


  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <Grid2 xs={12}>
        <Header2 />
      </Grid2>
   
      <Grid2 container justifyContent="center" spacing={3} minHeight="74.8vh" paddingTop= "60px" paddingBottom= "40px">
        <form id="taskForm" onSubmit={handleSubmit}>
          {/* Column 1: Task Title and Description */}
          <Grid2 xs={12} md={6} container direction="column" spacing={3}>
            {/* Heading and Buttons Row */}
            <Grid2 container alignItems="center" justifyContent="space-between">
              {/* "Add New Task" Heading */}
              <Grid2 item>
                <h4 className="task-title">Add New Task</h4>
              </Grid2>
  
              {/* Buttons Container */}
              <Grid2 item container spacing={2} justifyContent="flex-end">
                {/* Cancel Button */}
                {/* Add Task Button */}
                <Grid2 item>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                      padding: '8px 1px',
                      borderRadius: '10px',
                      backgroundColor: '#2E8B57',
                      cursor: 'pointer',
                      width: '200px',
                      fontSize: '16px',
                    }}
                  >
                    Confirm
                  </Button>
                </Grid2>

                <Grid2 item>
                  <Button
                    sx={{
                      padding: '8px 1px',
                      borderRadius: '10px',
                      backgroundColor: '#DC143C',
                      cursor: 'pointer',
                      width: '200px',
                      fontSize: '16px',
                    }}
                    fullWidth
                    variant="contained"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Grid2> 
              </Grid2>
            </Grid2>
  
            {/* Task Name Field */}
            <Grid2 xs={12}>
              <Box sx={{ position: 'relative' }}>
                {(task.title || titleIsFocused) && (
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: '-12px',
                      left: '20px',
                      backgroundColor: '#FFF1F1',
                      padding: '0 8px',
                      color: '#1059a2',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      zIndex: 1,
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    Task Name
                  </Typography>
                )}
  
                <TextField
                  fullWidth
                  placeholder={!task.title && !titleIsFocused ? 'Task Name' : ''}
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  onFocus={() => setTitleIsFocused(true)}
                  onBlur={() => setTitleIsFocused(false)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      background: 'linear-gradient(to bottom, #FFF1F1, #E2EAF1)',
                    },
                    '& .MuiInputBase-input': {
                      padding: '10px',
                      fontSize: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      textAlign: 'center',
                      justifyContent: 'center',
                      color: '#1059a2',
                      fontWeight: 'bold',
                      lineHeight: '3.7',
                      paddingTop: '30px',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i className="fa-regular fa-pen-to-square" style={{ fontSize: '24px' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setTask({ title: '' })}>
                          <Clear sx={{ fontSize: '24px' }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.title && <label className="errorLabel">{errors.title}</label>}
              </Box>
            </Grid2>
  
            {/* Task Description Field */}
            <Grid2 xs={12}>
              <Box sx={{ position: 'relative' }}>
                {(task.description || isFocused) && (
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: '-12px',
                      left: '20px',
                      backgroundColor: '#FFF1F1',
                      padding: '0 8px',
                      color: '#1059a2',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      zIndex: 1,
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    Task Description
                  </Typography>
                )}
  
                <TextField
                  fullWidth
                  placeholder={!task.description && !isFocused ? 'Task Description' : ''}
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  sx={{
                    marginBottom: '20px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      background: 'linear-gradient(to bottom, #FFF1F1, #E2EAF1)',
                    },
                    '& .MuiInputBase-input': {
                      padding: '30px',
                      fontSize: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      textAlign: 'center',
                      color: '#1059a2',
                      lineHeight: '3.7',
                      fontWeight: 'bold',
                    },
                  }}
                  multiline
                  rows={4}
                />
                {errors.description && <label className="errorLabel">{errors.description}</label>}
              </Box>
            </Grid2>
          </Grid2>
  
          {/* Column 2: Task Due Date */}
          <Grid2 xs={12} md={6} container direction="row" spacing={3}>
          <Grid2 xs={12}>
              {/* Due Date Field */}
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
                sx={{
                  backgroundImage: 'linear-gradient(to bottom, #FFF1F1, #E2EAF1)',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  '& .MuiInputBase-root': {
                    borderRadius: '10px',
                  },
                  '& .MuiFormLabel-root': {
                    color: '#105',
                  },
                  '& .MuiInputBase-input': {
                    padding: '10px',
                    fontSize: '30px',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setTask({ ...task, dueDate: '' })}>
                        <Clear sx={{ fontSize: '24px' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  style: {
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                  },
                }}
              />
            </Grid2>
            <Grid2 item container spacing={2} justifyContent="flex-end">
              <Grid2 item>
                <ColorDropdown name="category" onChange={handleChange} />
              </Grid2>
              <Grid2 item>
                <PriorityDropdown name="priority" onChange={handleChange} />
              </Grid2>
            </Grid2>
          </Grid2>
        </form>

        {isOpen && (
          <TaskDialog
            open={isOpen}
            onClose={handleDialogClose}
          />
        )}
      </Grid2>
      {/* Footer */}
      <Grid2 xs={12} sx={{ marginTop: 'auto' }}>
        <Footer />
      </Grid2>
    </Box>
  );
};

export default AddTask;
