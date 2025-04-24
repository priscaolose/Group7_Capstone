import React, { useEffect, useState } from 'react';
import { Timestamp } from "firebase/firestore";
import Header2 from './Components/Header2';
import Footer from './Components/Footer';
import './CSSFolders/AddTask.css'; 
import { Grid2, Box, TextField, Button, InputAdornment, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { addTask, getTasks } from './Api/createTask';
import ColorDropdown from './ColorDropdown'; 
import PriorityDropdown from './taskPriority';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useUser } from './Components/context';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { getUID } from './firebase/firebaseAuth';
// Custom Theme
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
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
      main: "#1059a2",
    },
    background: {
      default: "#f4f6f8",
    },
  },
});
const AddTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalOpen, setIsCalOpen] = useState(false);
  const { setTasks, user } = useUser();
  const [uid, setUid] = useState(null);
  const [errors, setErrors] = useState({}); // Single object to hold all error messages
  const [isFocused, setIsFocused] = useState(false);
  const [titleIsFocused, setTitleIsFocused] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: '',
    priority: '',
  });

  // Custom Theme
  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins", sans-serif',
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
        main: "#1059a2",
      },
      background: {
        default: "#f4f6f8",
      },
    },
  });
  const isSmallScreen = useMediaQuery("(max-width: 900px)");
  
  useEffect(() => {
    const fetchUID = async () => {
      if (user?.email) {
        const resolvedUID = await getUID(user.email);
        if (resolvedUID !== "error") {
          setUid(resolvedUID);
          console.log("UID: " + resolvedUID);
        }
      }
    };

    fetchUID();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleYesOnCancel = (onClose) =>{
    setTask({
      title: '',
      description: '',
      dueDate: '',
      category: '',
      priority: '',
    });
    setIsOpen(false);
    onClose();
  }
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
  const TaskCancellationDialog = ({ open, onClose }) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Task Creation Cancellation</DialogTitle>
        <DialogContent>
             Are you sure you want to cancel the task creation?
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
          onClick={() => {
            handleYesOnCancel(onClose)
          }}>
          Yes</Button>
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
          No</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleCancel = () => {
    setIsCalOpen(true);
    setErrors({});
  };
  
  const handleDialogClose = () => {
    setIsOpen(false); 
    setIsCalOpen(false);
  }

  const handleSubmit = async (e) => {
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

    const dueDateTimestamp = Timestamp.fromDate(new Date(task.dueDate));
    await addTask(uid, task.title, task.description, dueDateTimestamp, task.category, task.priority);
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
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
      <ThemeProvider theme={theme}>
      {/* Header */}
      <Grid2 xs={12}>
        <Header2 />
      </Grid2>

      {/* Main content  */}
      <Grid2 
        container 
        justifyContent="center" 
        spacing={3} 
        sx={{ 
          flexGrow: 1, 
          paddingTop: { xs: 2, md: "60px" },
          paddingBottom: { xs: 2, md: "40px" }
        }}
      >
        <form id="taskForm" onSubmit={handleSubmit}>
          <Grid2 xs={12} md={6} container direction="column" spacing={3}>
            {/* Add Task form fields here */}
            <Grid2 container alignItems="center" justifyContent="space-between">
              <Grid2 container direction="column" spacing={1} alignItems="flex-start">
                <Grid2 item>
                  <h4 className="task-title" style={{ margin: 0 }}>Add New Task</h4>
                </Grid2>

                <Grid2 item>
                  <Link to="/dashboard" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: '#1059a2' }}>
                    <ExitToAppIcon style={{ marginRight: 5 }} />
                    Return to dashboard
                  </Link>
                </Grid2>
              </Grid2>

              {/* Buttons */}
              <Grid2 item container spacing={2} justifyContent="flex-end">
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
                        <IconButton onClick={() => setTask({ ...task, title: '' })}>
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
            {/* Due Date Field */}
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
              />
              {errors.dueDate && <label className="errorLabel">{errors.dueDate}</label>}
            </Grid2>

            {/* Category and Priority Dropdowns */}
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

        {isCalOpen && (
          <TaskCancellationDialog
            open={isCalOpen}
            onClose={handleDialogClose}
          />
        )}
      </Grid2>
          
      <Box sx={{ mt: 'auto' }}>
        <Footer />
      </Box>
      </ThemeProvider>

    </Box>
);

};

export default AddTask;