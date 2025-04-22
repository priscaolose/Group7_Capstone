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
import { useLocation } from 'react-router-dom';
import useTasks from './Api/extractTasks.js';
import { deleteTask } from './Api/createTask.js';
import { useUser } from './Components/context';
import FilterByIcon from './Components/filterByIcon.js';

/**viewTask  page*/
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
;

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

const TaskTable = ({ filteredTasks, onDelete, completedTasks, onTaskCompletion }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  
  const handleCheckboxChange = (taskId, isCompleted) => {
    onTaskCompletion(taskId, !isCompleted);
  };

  const openDeleteDialog = (taskId) => {
    setSelectedTaskId(taskId);
    setIsOpen(true);
  };

  // Separate tasks section rendering function
  const renderTasksSection = (tasks, sectionTitle, isCompleted) => {
    if (tasks.length === 0) {
      return null;
    }
    
    return (
      <>
        <Typography variant="h6" sx={{ padding: 2, color: '#2E3B55', fontWeight: 'bold' }}>
          {sectionTitle}
        </Typography>
        <Table sx={{ minWidth: 650, borderRadius: '8px' }} aria-label="task table">
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} sx={{
                borderBottom: '1.5px solid #2E3B55',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                paddingBottom: '10px',
                backgroundColor: isCompleted ? '#f5f5f5' : 'inherit',
                '&:hover': {
                  backgroundImage: 'linear-gradient(to bottom, #E2EAF1, #FFF1F1)',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                },
              }}>
                <TableCell padding="checkbox">
                  <Checkbox 
                    checked={isCompleted} 
                    onChange={() => handleCheckboxChange(task.id, isCompleted)}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography fontWeight="bold" sx={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
                    {task.title}
                  </Typography>
                  <Typography variant="body3" color="text.secondary">
                    {task.description}
                  </Typography>
                  <Typography variant="body2"sx={{ color: 'red' }}>
                    Task DueDate: {task.dueDate}
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
                      onClick={() => openDeleteDialog(task.id)}    
                    >
                      delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: 5, borderRadius: '8px', maxHeight: '600px', maxWidth: '1000px', overflow: 'auto', margin: '0 auto', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
      {filteredTasks.length === 0 && completedTasks.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', padding: 2, color: 'red' }}>
          No tasks matching that description.
        </Typography>
      ) : (
        <>
          {renderTasksSection(filteredTasks, "Active Tasks", false)}
          {renderTasksSection(completedTasks, "Completed", true)}
          
          <TaskDialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            handleDelete={() => {
              handleDelete(selectedTaskId, onDelete);
              setIsOpen(false);
            }}                        
            title={[...filteredTasks, ...completedTasks].find(task => task.id === selectedTaskId)?.title || ""}
            taskID={selectedTaskId}
          />
        </>
      )}
    </TableContainer>
  );
};

const ViewTask = () => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useUser();
  const location = useLocation();
  const userEmail = user?.email;
  console.log("userEmail",userEmail)
  const { tasks, loading, error } = useTasks(userEmail);

  useEffect(() => {
    // Initialize tasks with completion status
    if (tasks && tasks.length > 0) {
      const completed = tasks.filter(task => task.completed);
      const active = tasks.filter(task => !task.completed);
      setCompletedTasks(completed);
      setFilteredTasks(active);
    }
  }, [tasks]);

  const handleDeleteTask = (taskId) => {
    setFilteredTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
    setCompletedTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  };

  const handleTaskCompletion = (taskId, isCompleted) => {
    if (isCompleted) {
      // Move task from active to completed
      const taskToMove = filteredTasks.find(task => task.id === taskId);
      if (taskToMove) {
        setFilteredTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        setCompletedTasks(prevTasks => [...prevTasks, {...taskToMove, completed: true}]);
      }
    } else {
      // Move task from completed to active
      const taskToMove = completedTasks.find(task => task.id === taskId);
      if (taskToMove) {
        setCompletedTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        setFilteredTasks(prevTasks => [...prevTasks, {...taskToMove, completed: false}]);
      }
    }
  };

  const toggleDropDown = () => {
    setShowDropdown((prev) => !prev);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Grid2 xs={12}>
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
              <SearchBox tasks={[...filteredTasks, ...completedTasks]} setFilteredTasks={(newTasks) => {
                // Keep the separation between active and completed tasks when filtering
                const completed = newTasks.filter(task => task.completed);
                const active = newTasks.filter(task => !task.completed);
                setCompletedTasks(completed);
                setFilteredTasks(active);
              }} />
            </Grid2>

            <Grid2 item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", gap: 0.5 }}>
              <FilterByIcon filteredTasks={[...filteredTasks, ...completedTasks]} setFilteredTasks={(newTasks) => {
                // Keep the separation between active and completed tasks when filtering
                const completed = newTasks.filter(task => task.completed);
                const active = newTasks.filter(task => !task.completed);
                setCompletedTasks(completed);
                setFilteredTasks(active);
              }} />
              <SortByDropDown filteredTasks={[...filteredTasks, ...completedTasks]} setFilteredTasks={(newTasks) => {
                // Keep the separation between active and completed tasks when sorting
                const completed = newTasks.filter(task => task.completed);
                const active = newTasks.filter(task => !task.completed);
                setCompletedTasks(completed);
                setFilteredTasks(active);
              }} />
            </Grid2>
      </Grid2>

        </Grid2>
        <Grid2 item xs={12} sx={{ marginTop: 3 }}>
          <TaskTable 
            filteredTasks={filteredTasks} 
            completedTasks={completedTasks}
            onDelete={handleDeleteTask}
            onTaskCompletion={handleTaskCompletion}
          />
        </Grid2>
      </Box>
      <Grid2 xs={12}>
        <Footer />
      </Grid2>
    </Box>
  );
};

export default ViewTask;