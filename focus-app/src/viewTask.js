import React, { useState, useEffect } from 'react';
import Header2 from './Components/Header2';
import Footer from './Components/Footer';
import './CSSFolders/viewTask.css';
import { useNavigate } from 'react-router-dom';
import { Grid2, Box, Typography } from '@mui/material';
import './CSSFolders/SearchBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper, Checkbox } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import SortByDropDown from './sortByDropdown.js';
import useTasks from './Api/extractTasks.js';
import { deleteTask } from './Api/createTask.js';
import { useUser } from './Components/context';
import FilterByIcon from './Components/filterByIcon.js';
import { getUID } from "./firebase/firebaseAuth";
import moment from 'moment';

const SearchBox = ({ setFilteredTasks, tasks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value.trim());
    if (!Array.isArray(tasks)) {
      console.error("This is not an array");
      return;
    }
    if (value.trim() === "") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) =>
        task.title.toLowerCase().replace(/\s+/g, "").trim().includes(value.toLowerCase().replace(/\s+/g, "").trim()) ||
        task.description.toLowerCase().replace(/\s+/g, "").trim().includes(value.toLowerCase().replace(/\s+/g, "").trim())
      ));
    }
  };
  const handleSearch = () => {
    setFilteredTasks(tasks.filter((task) =>
      task.title.toLowerCase().replace(/\s+/g, "").trim().includes(searchTerm.toLowerCase().trim().replace(/\s+/g, "").trim()) ||
      task.description.toLowerCase().replace(/\s+/g, "").trim().includes(searchTerm.toLowerCase().replace(/\s+/g, "").trim())
    ));
  };
  return (
    <div className='search-box'>
      <input
        type='text'
        placeholder='Enter Task Name'
        value={searchTerm}
        onChange={handleInputChange}
      />
      <span className='search-icon' onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </span>
    </div>
  );
};

const handleDelete = async (taskId, onDelete) => {
  try {
    const success = await deleteTask(taskId);
    if (success) {
      onDelete(taskId);
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

const convertingDueDate = (dueDate) => {
  const momentDueDate = moment.unix(dueDate.seconds);
  const formattedDate = momentDueDate.format('MMMM Do YYYY, h:mm:ss a');
  return formattedDate;
}

const TaskDialog = ({ open, onClose, title, taskID, handleDelete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delect Task</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the "{title}" task? This action cannot be undone.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={() => handleDelete(taskID, title)}>
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const TaskTable = ({ filteredTasks, onDelete, setFilteredTasks }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  console.log("Before the toggle or whatever", filteredTasks);

  const handleToggleCompleted = async (completed, taskId) => {
    try {
      const response = await fetch(
        `/api/completeTask?taskID=${encodeURIComponent(taskId)}&completed=${completed}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
  
      if (response.ok) {
        console.log("Task toggle completed:", data.message);
        // Update local UI only if backend succeeds
        setFilteredTasks((prevFilteredTasks) =>
          prevFilteredTasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          )
        );
      } else {
        console.error("Failed to toggle task:", data.error);
      }
    } catch (error) {
      console.error("Error calling completeTask API:", error);
    }
  };

  // Separate active and completed tasks
  const activeTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  useEffect(() => {
    console.log("Updated Filtered Tasks:", filteredTasks);
  }, [filteredTasks]);

  // Function to render a single task row
  const renderTaskRow = (task) => (
    <TableRow key={task.id} sx={{
      borderBottom: '1.5px solid #2E3B55',
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
      paddingBottom: '10px',
      backgroundColor: task.completed ? '#f5f5f5' : 'inherit',
      '&:hover': {
        backgroundImage: 'linear-gradient(to bottom, #E2EAF1, #FFF1F1)',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
      },
    }}>
      <TableCell padding="checkbox">
        <Checkbox 
          onChange={() => handleToggleCompleted(task.completed, task.id)} 
          checked={task.completed || false} 
        />
      </TableCell>
      <TableCell component="th" scope="row">
        <Typography 
          fontWeight="bold" 
          sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        >
          {task.title}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {task.description}
        </Typography>
        <Typography variant="body2" sx={{color: "#ff7866"}}>
          Task DueDate: {convertingDueDate(task.dueDate)}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Box sx={{ display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: 'none', backgroundColor: '#1059a2' }}
            onClick={() => navigate(`/editTask/${task.id}`)}
          >
            edit
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{ textTransform: 'none' }}
            onClick={() => {
              setSelectedTask(task);
              setIsOpen(true);
            }}
          >
            delete
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );

  return (
    <TableContainer component={Paper} sx={{ marginTop: 5, borderRadius: '8px', maxHeight: '600px', maxWidth: '1000px', overflow: 'auto', margin: '0 auto', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
      {filteredTasks.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', padding: 2, color: 'red' }}>
          No tasks matching that description.
        </Typography>
      ) : (
        <>
          {/* Active Tasks Section */}
          {activeTasks.length > 0 && (
            <Box>
              <Typography variant="h6" sx={{ padding: 2, fontWeight: 'bold', color: '#2E3B55' }}>
                Active Tasks
              </Typography>
              <Table sx={{ minWidth: 650, borderRadius: '8px' }} aria-label="active task table">
                <TableBody>
                  {activeTasks.map(task => renderTaskRow(task))}
                </TableBody>
              </Table>
            </Box>
          )}
          
          {/* Completed Tasks Section */}
          {completedTasks.length > 0 && (
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6" sx={{ padding: 2, fontWeight: 'bold', color: '#2E3B55' }}>
                Completed
              </Typography>
              <Table sx={{ minWidth: 650, borderRadius: '8px' }} aria-label="completed task table">
                <TableBody>
                  {completedTasks.map(task => renderTaskRow(task))}
                </TableBody>
              </Table>
            </Box>
          )}
        </>
      )}
      
      {selectedTask && (
        <TaskDialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          handleDelete={() => {
            handleDelete(selectedTask.id, onDelete);
            setIsOpen(false);
          }}
          title={selectedTask.title}
          taskID={selectedTask.id}
        />
      )}
    </TableContainer>
  );
};

const ViewTask = () => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const { user } = useUser() ;
  const uid = localStorage.getItem('uid')
  console.log("MYUId",uid)
  const { tasks, loading, error } = useTasks(uid);
  
  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);
  
  // if (loading) {
  // return <div>Loading...</div>;
  // }
  if (error) {
    return <div>{error}</div>;
  }
  
  const handleDeleteTask = (taskId) => {
    setFilteredTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh',overflow:'auto' }}>
      <Grid2 xs={12}>'
        <Header2 />
      </Grid2>
      <Box sx={{
        flexGrow: 1,
        overflowY: 'auto',
        margin: '10px 30px',
        paddingTop: '10px',
        width: '100%',
        '& > *': { marginBottom: 3 }
      }}>
        <Grid2 item>
          <Typography variant="h4" className="task-title" sx={{ marginBottom: 2 }}>
            {user.firstName}'s Tasks
          </Typography>
        </Grid2>
        <Grid2
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 2,
            marginBottom: 3,
          }}
        >
          <Grid2 container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <Grid2 item xs={12} sm={6} md={4}>
              <SearchBox tasks={tasks} setFilteredTasks={setFilteredTasks} />
            </Grid2>
            <Grid2 item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", gap: 0.5 }}>
              <FilterByIcon filteredTasks={tasks} setFilteredTasks={setFilteredTasks} />
              <SortByDropDown filteredTasks={tasks} setFilteredTasks={setFilteredTasks} />
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 item xs={12} sx={{ marginTop: 3 }}>
          <TaskTable filteredTasks={filteredTasks} setFilteredTasks={setFilteredTasks} onDelete={handleDeleteTask} />
        </Grid2>
      </Box>
        <Footer />
    </Box>
  );
};

export default ViewTask;