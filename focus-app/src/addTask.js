import React, { useState } from "react";
import Header2 from "./Components/Header2";
import Footer from "./Components/Footer";
import "./CSSFolders/AddTask.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Grid2,
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { addTask } from "./Api/createTask";
import { useUser } from "./Components/context";

const AddTask = ({ loggedIn, logout }) => {
  const location = useLocation();
  const email = location.state?.email;
  const [errors, setErrors] = useState({}); // Single object to hold all error messages
  const [isFocused, setIsFocused] = useState(false);
  const [titleIsFocused, setTitleIsFocused] = useState(false);
  const { setUser, setTasks } = useUser();

  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setTask({
      title: "",
      description: "",
      dueDate: "",
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous error messages
    setErrors({});

    // Create an errors object
    const newErrors = {};
    if (!task.title) {
      newErrors.title = "Title is required.";
    }
    if (task.title && task.title.length < 8) {
      newErrors.title = "Title must be at least 8 characters";
    }
    if (task.title && task.title.length > 20) {
      newErrors.title = "Title must be at less than 20 characters";
    }
    if (!task.description) {
      newErrors.description = "Task Description is required.";
    }
    if (task.description && task.description.length < 15) {
      newErrors.description = "Description must be at least 15 characters";
    }
    if (task.description && task.description.length > 150) {
      newErrors.description = "Description must be less than 150 characters";
    }
    if (!task.dueDate) {
      newErrors.dueDate = "Due date is required.";
    }

    // If there are errors, set them in state and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Prevent the form submission if there are errors
    }

    setTask({
      title: "",
      description: "",
      dueDate: "",
    });

    // Add task to Firestore
    addTask(email, task.title, task.description, task.dueDate, new Date());
    handleTaskContext(email);

    // Navigate back to dashboard
    navigate("/dashboard");

    // Add your task submission logic here
    console.log("Task to be added:", task);
    alert("Task has been successfully submitted");
  };

  const handleTaskContext = async (email) => {
    try {
      const response = await fetch(
        `/api/getTask?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(!response.ok){
        throw new Error("Could not get tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error getting tasks:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <Grid2 xs={12}>
        <Header2 />
      </Grid2>

      <Grid2 container justifyContent="center" spacing={3} minHeight="74.8vh">
        <form onSubmit={handleSubmit}>
          {/* Column 1: Task Title and Description */}
          <Grid2 xs={12} md={6} container direction="column" spacing={3}>
            <Grid2 xs={12}>
              <h4 className="task-title">Add New Task</h4>
            </Grid2>

            {/* Task Name Field */}

            <Grid2 xs={12}>
              <Box sx={{ position: "relative" }}>
                {(task.title || titleIsFocused) && (
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "-12px",
                      left: "20px",
                      backgroundColor: "#FFF1F1",
                      padding: "0 8px",
                      color: "#1059a2",
                      fontSize: "14px",
                      fontWeight: "bold",
                      zIndex: 1,
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    Task Name
                  </Typography>
                )}

                <TextField
                  fullWidth
                  placeholder={
                    !task.title && !titleIsFocused ? "Task Name" : ""
                  }
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  onFocus={() => setTitleIsFocused(true)}
                  onBlur={() => setTitleIsFocused(false)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      background:
                        "linear-gradient(to bottom, #FFF1F1, #E2EAF1)",
                    },
                    "& .MuiInputBase-input": {
                      padding: "10px",
                      fontSize: "30px",
                      textAlign: "center",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      textAlign: "center",
                      justifyContent: "center",
                      color: "#1059a2",
                      fontWeight: "bold",
                      lineHeight: "3.7",
                      paddingTop: "30px",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i
                          className="fa-regular fa-pen-to-square"
                          style={{ fontSize: "24px" }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setTask({ title: "" })}>
                          <Clear sx={{ fontSize: "24px" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  margin-bottom={5}
                />
                {errors.title && (
                  <label className="errorLabel">{errors.title}</label>
                )}
              </Box>
            </Grid2>

            {/* Task Description Field with Floating Label */}
            <Grid2 xs={12}>
              <Box sx={{ position: "relative" }}>
                {(task.description || isFocused) && (
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "-12px",
                      left: "20px",
                      backgroundColor: "#FFF1F1",
                      padding: "0 8px",
                      color: "#1059a2",
                      fontSize: "14px",
                      fontWeight: "bold",
                      zIndex: 1,
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    Task Description
                  </Typography>
                )}

                <TextField
                  fullWidth
                  placeholder={
                    !task.description && !isFocused ? "Task Description" : ""
                  }
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  sx={{
                    marginBottom: "20px", // Add spacing below the description
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      background:
                        "linear-gradient(to bottom, #FFF1F1, #E2EAF1)",
                    },
                    "& .MuiInputBase-input": {
                      padding: "10px",
                      fontSize: "30px",
                      textAlign: "center",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      textAlign: "center",
                      justifyContent: "center",
                      color: "#1059a2",
                      fontWeight: "bold",
                      lineHeight: "3.7",
                      paddingTop: "30px",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i
                          className="fa-regular fa-pen-to-square"
                          style={{ fontSize: "24px" }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setTask({ description: "" })}
                        >
                          <Clear sx={{ fontSize: "24px" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  multiline
                  rows={4}
                  margin-bottom={5}
                />
                {errors.description && (
                  <label className="errorLabel">{errors.description}</label>
                )}
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
                  backgroundImage:
                    "linear-gradient(to bottom, #FFF1F1, #E2EAF1)",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  "& .MuiInputBase-root": {
                    borderRadius: "10px",
                  },
                  "& .MuiFormLabel-root": {
                    color: "#105",
                  },
                  "& .MuiInputBase-input": {
                    padding: "10px",
                    fontSize: "30px",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setTask({ ...task, dueDate: "" })}
                      >
                        <Clear sx={{ fontSize: "24px" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  style: {
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                  },
                }}
              />
            </Grid2>

            {/* Submit and Cancel Buttons */}
            <Grid2 xs={12}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  padding: "8px 1px",
                  borderRadius: "20px",
                  backgroundColor: "#8AAEC6",
                  cursor: "pointer",
                  width: "200px",
                  fontSize: "16px",
                  margin: "10px auto",
                }}
              >
                Add Task
              </Button>
            </Grid2>

            <Grid2 xs={12}>
              <Button
                sx={{
                  padding: "8px 1px",
                  borderRadius: "20px",
                  backgroundColor: "#8AAEC6",
                  cursor: "pointer",
                  width: "200px",
                  fontSize: "16px",
                  margin: "10px auto",
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
        </form>
      </Grid2>

      {/* Footer */}
      <Grid2 xs={12}>
        <Footer />
      </Grid2>
    </Box>
  );
};

export default AddTask;
