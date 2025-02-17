import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  useMediaQuery,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUser } from "./context";

function NoteSection() {
  const { user } = useUser();
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to save note to the database
  const handleNote = async () => {
    if (!note.trim()) {
      setMessage("Please enter a note before saving.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/setNotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: user?.firstName || "Guest",
          note: note,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setNotesList([...notesList, note]); // Add note to UI
        setNote(""); // Clear input field
        setMessage("Note saved successfully!");

        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error saving note:", error);
      setMessage("Failed to save note. Try again.");
      setTimeout(() => setMessage(""), 3000);
    }
    finally {
      setLoading(false);
    }
  };

  // Function to delete a note locally (not from database yet)
  const handleDelete = (index) => {
    setNotesList(notesList.filter((_, i) => i !== index));
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: "16px",
        background: "white",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        minHeight: "50vh",
      }}
    >
      <Typography variant="h6" sx={{ color: "#1059a2", mb: 2 }}>
        Notes
      </Typography>

      {/* Input Field */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          multiline
          label="Enter a note"
          variant="outlined"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          sx={{
            backgroundColor: "FFF176",
            borderRadius: "8px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
            "& .MuiOutlinedInput-root": {
              border: "none",
              "& fieldset": { border: "none" },
            },
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            fontSize: "1rem",
            padding: "8px",
          }}
        />
        <Button
          variant="contained"
          onClick={handleNote}
          disabled={loading}
          sx={{ mt: 2, backgroundColor: "#1059a2", color: "white" }}
        >
          {loading ? "Saving..." : "Save Note"}
        </Button>
      </Box>

      {/* Display Notes List */}
      <Box sx={{ mt: 2, maxHeight: "40vh", overflowY: "auto" }}>
        {notesList.map((note, index) => (
          <Paper
            key={index}
            sx={{
              p: 2,
              mt: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">{note}</Typography>
            <IconButton onClick={() => handleDelete(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </Paper>
        ))}
      </Box>

      {/* Status Message */}
      {message && (
        <Typography sx={{ color: "green", mt: 2 }}>{message}</Typography>
      )}
    </Paper>
  );
}

export default NoteSection;
