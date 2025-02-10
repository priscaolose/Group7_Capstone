import React, { useState } from 'react';
import Header2 from './Components/Header2';
import Footer from './Components/Footer';
import './CSSFolders/viewTask.css';
import { useNavigate } from 'react-router-dom';
import { Grid2, Box, Typography } from '@mui/material';
import './CSSFolders/SearchBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSort, faFilter } from '@fortawesome/free-solid-svg-icons';
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper, Button, Checkbox } from '@mui/material';
import SortByDropDown from './sortByDropdown.js';
const tasks = [
  { id: 1, name: 'Clean my room', description: 'Organize the bookshelves and vacuum the floor', dueDate: '12/2/24' },
  { id: 2, name: 'Buy groceries', description: 'Pick up groceries including eggs, milk, and bread', dueDate: '13/2/24' },
  { id: 3, name: 'Complete homework', description: 'Finish the math assignment and review the history notes', dueDate: '14/2/24' },
  { id: 4, name: 'Prepare for meeting', description: 'Create a presentation for the client meeting and review the agenda', dueDate: '25/2/24' },
  { id: 5, name: 'Submit project', description: 'Final edits to the project and submit via the portal', dueDate: '5/2/24' },
  { id: 6, name: 'Workout', description: 'Do a full-body workout, including 30 minutes of cardio', dueDate: '6/2/24' },
  { id: 7, name: 'Dentist appointment', description: 'Get a dental checkup and cleaning', dueDate: '7/2/24' },
  { id: 8, name: 'Clean the garage', description: 'Organize tools and dispose of old items', dueDate: '25/2/24' },
  { id: 9, name: 'Prepare dinner', description: 'Cook pasta with a side of garlic bread', dueDate: '5/2/24' },
  { id: 10, name: 'Send emails', description: 'Send follow-up emails to clients and reply to work emails', dueDate: '6/2/24' },
  { id: 11, name: 'Attend workshop', description: 'Participate in the online coding workshop', dueDate: '7/2/24' },
];


const SearchBox = ({ setFilteredTasks }) => {
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
        task.name.toLowerCase().replace(/\s+/g,"").trim().includes(value.toLowerCase().replace(/\s+/g,"").trim()) ||
        task.description.toLowerCase().replace(/\s+/g,"").trim().includes(value.toLowerCase().replace(/\s+/g,"").trim())
      ));
    }
  };

  const handleSearch = () => {
   setFilteredTasks(tasks.filter((task) =>
      task.name.toLowerCase().replace(/\s+/g,"").trim().includes(searchTerm.toLowerCase().trim().replace(/\s+/g,"").trim()) ||
      task.description.toLowerCase().replace(/\s+/g,"").trim().includes(searchTerm.toLowerCase().replace(/\s+/g,"").trim())
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

const TaskTable = ({ filteredTasks }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ marginTop: 5, borderRadius: '8px', maxHeight: '600px', maxWidth: '1000px', overflow: 'auto', margin: '0 auto', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
      {filteredTasks.length === 0?
      (<Typography variant="h6" sx={{ textAlign: 'center', padding: 2,color:'red' }}>
          No tasks matching that description.
        </Typography>):
      (<Table sx={{ minWidth: 650, borderRadius: '8px' }} aria-label="task table">
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id} sx={{
            //  backgroundImage: 'linear-gradient(to bottom, #FFF1F1, #E2EAF1)',
              borderBottom: '1.5px solid #2E3B55',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
              paddingBottom: '10px',
              '&:hover': {
                backgroundImage: 'linear-gradient(to bottom, #E2EAF1, #FFF1F1)',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              },  

            }}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography fontWeight="bold">{task.name}</Typography>
                <Typography variant="body3" color="text.secondary">
                  {task.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 Task DueDate: {task.dueDate}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
                  <Button variant="contained" size="small"  sx={{ textTransform: 'none' ,backgroundColor: '#8AAEC6'}} onClick={() => navigate('/editTask')}>
                    edit
                  </Button>
                  <Button variant="contained" size="small" color="error" sx={{ textTransform: 'none' }}>
                    delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        )};
    </TableContainer>
  );
};

const ViewTask = ({ loggedIn, logout }) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropDown = () => {
    setShowDropdown((prev) => !prev);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
            Antonette's Tasks
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
          <Grid2 item xs={12} sm={6} md={4}>
            <SearchBox setFilteredTasks={setFilteredTasks} />
          </Grid2>
          <Grid2 item xs={12} sm={6} md={2} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: "center", gap: 1 }}>
            <span className="icon-text" >
              <FontAwesomeIcon className="filter-icon" icon={faFilter}></FontAwesomeIcon>
              Filter Tasks
            </span>
            <div style={{ position: "relative", display: "inline-block" }}>
                <span className="icon-text" onClick={toggleDropDown}>
                  <FontAwesomeIcon className="sort-icon" icon={faSort}  />
                  Sort By 
                </span>
                  {showDropdown && (
                    <div style={{ 
                          position: "absolute", 
                          top: "100%",  
                          left: 0, 
                          zIndex: 10, 
                          background: "white", 
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
                          borderRadius: "8px",
                          padding: "5px"
                        }}>
                      <SortByDropDown />
                    </div>
                  )}
              </div>
          </Grid2>
        </Grid2>
        <Grid2 item xs={12} sx={{ marginTop: 3 }}>
          <TaskTable filteredTasks={filteredTasks} />
        </Grid2>
      </Box>
      <Grid2 xs={12}>
        <Footer />
      </Grid2>
    </Box>
  );
};

export default ViewTask;
