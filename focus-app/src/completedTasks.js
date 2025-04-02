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

const TaskTable = ({ filteredTasks, onDelete, setFilteredTasks }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCompleted = (taskId) => {
    setFilteredTasks((prevFilteredTasks) =>
      prevFilteredTasks.map((t) => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const uncompletedTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 5, borderRadius: '8px', maxHeight: '600px', maxWidth: '1000px', overflow: 'auto', margin: '0 auto', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
      <Table sx={{ minWidth: 650, borderRadius: '8px' }} aria-label="task table">
        <TableBody>
          {uncompletedTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell padding="checkbox">
                <Checkbox onChange={() => handleToggleCompleted(task.id)} checked={task.completed} />
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">{task.description}</Typography>
                <Typography variant="body2" sx={{ color: "#ff7866" }}>Task DueDate: {task.dueDate}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {completedTasks.length > 0 && (
        <>
          <Typography variant="h6" sx={{ textAlign: 'center', paddingTop: 2, fontWeight: 'bold' }}>Completed Tasks</Typography>
          <Table sx={{ minWidth: 650, borderRadius: '8px' }}>
            <TableBody>
              {completedTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell padding="checkbox">
                    <Checkbox onChange={() => handleToggleCompleted(task.id)} checked={task.completed} />
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">{task.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{task.description}</Typography>
                    <Typography variant="body2" sx={{ color: "#ff7866" }}>Task DueDate: {task.dueDate}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </TableContainer>
  );
};

const ViewTask = () => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const { user } = useUser();
  const uid = localStorage.getItem('uid');
  const { tasks, loading, error } = useTasks(uid);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleDeleteTask = (taskId) => {
    setFilteredTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header2 />
      <TaskTable filteredTasks={filteredTasks} setFilteredTasks={setFilteredTasks} onDelete={handleDeleteTask} />
      <Footer />
    </Box>
  );
};

export default ViewTask;
