import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { useUser } from "./context";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { format } from "date-fns";

function NoteSection() {
  const { user } = useUser();
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNote, setEditedNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch notes from Firebase when user logs in
  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return;

      try {
        const querySnapshot = await getDocs(collection(db, "Notes"));
        const fetchedNotes = querySnapshot.docs
          .filter((doc) => doc.data().userName === user.firstName)
          .map((doc) => ({ id: doc.id, ...doc.data() }));

        setNotesList(fetchedNotes);
        setFilteredNotes(fetchedNotes); // Initialize filtered notes with all notes
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user]);

  // Function to format timestamps
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "No date";

    // Handle both Firestore timestamp objects and Date objects
    const noteDate = timestamp instanceof Date 
      ? timestamp 
      : new Date(timestamp.seconds * 1000);
    
    const now = new Date(); // Current time
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const noteDay = new Date(noteDate.getFullYear(), noteDate.getMonth(), noteDate.getDate());
    
    const isToday = noteDay.getTime() === today.getTime();
    const isYesterday = noteDay.getTime() === yesterday.getTime();

    if (isToday) {
      return `Today at ${format(noteDate, "h:mm a")}`; // Example: "Today at 3:45 PM"
    } else if (isYesterday) {
      return `Yesterday at ${format(noteDate, "h:mm a")}`; // Example: "Yesterday at 11:30 AM"
    } else {
      return `${format(noteDate, "MMM d, yyyy")} at ${format(noteDate, "h:mm a")}`; // Example: "Feb 10, 2024 at 8:00 PM"
    }
  };

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredNotes(notesList);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = notesList.filter(note => 
        note.note.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredNotes(filtered);
    }
  }, [searchQuery, notesList]);

  // Save a new note to Firebase
  const handleNote = async () => {
    if (!note.trim()) {
      setMessage("Please enter a note before saving.");
      return;
    }

    try {
      const timestamp = new Date();
      const newNoteRef = await addDoc(collection(db, "Notes"), {
        userName: user?.firstName || "Guest",
        note: note,
        timestamp: timestamp,
      });

      setNotesList([
        ...notesList, 
        { id: newNoteRef.id, note, userName: user?.firstName || "Guest", timestamp }
      ]);
      setNote("");
      setMessage("Note added successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving note:", error);
      setMessage("Failed to save note. Try again.");
    }
  };

  // Delete a note from Firebase
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Notes", id));
      const updatedNotes = notesList.filter((note) => note.id !== id);
      setNotesList(updatedNotes);
      
      // Also update filtered notes
      setFilteredNotes(
        searchQuery.trim() === "" 
          ? updatedNotes 
          : updatedNotes.filter(note => 
              note.note.toLowerCase().includes(searchQuery.toLowerCase())
            )
      );
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Enable edit mode for a note
  const handleEdit = (note) => {
    setEditingNoteId(note.id);
    setEditedNote(note.note); // Set existing note text in the input
  };

  // Save edited note to Firebase
  const handleSaveEdit = async (id) => {
    try {
      await updateDoc(doc(db, "Notes", id), { note: editedNote });

      // Update the note in UI
      const updatedNotes = notesList.map((n) => 
        n.id === id ? { ...n, note: editedNote } : n
      );
      
      setNotesList(updatedNotes);
      
      // Also update filtered notes
      setFilteredNotes(
        searchQuery.trim() === "" 
          ? updatedNotes 
          : updatedNotes.filter(note => 
              note.note.toLowerCase().includes(searchQuery.toLowerCase())
            )
      );
      
      setEditingNoteId(null); // Exit edit mode
      setMessage("Note updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating note:", error);
      setMessage("Failed to update note. Try again.");
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: "16px",
        background: "white",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        height: "500px", // Fixed height
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ color: "#1059a2", mb: 2 }}>
        Notes
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Input Field */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          multiline
          rows={3} // Reduced from 4 to 3 rows to save space
          label="Enter a note"
          variant="outlined"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          sx={{
            backgroundColor: "#FFF176",
            borderRadius: "8px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
            "& .MuiOutlinedInput-root": { border: "none", "& fieldset": { border: "none" } },
            fontFamily: `"Comic Sans MS", cursive`,
            fontSize: "1rem",
          }}
        />
        <Button
          variant="contained"
          onClick={handleNote}
          disabled={loading}
          sx={{ mt: 2, backgroundColor: "#1059a2", color: "white" }}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Box>

      {/* Status Message */}
      {message && (
        <Typography sx={{ color: "green", my: 1, fontSize: "0.875rem" }}>
          {message}
        </Typography>
      )}

      {/* Notes List Container - This is scrollable with fixed height */}
      <Box 
        sx={{ 
          flexGrow: 1,
          overflowY: "auto",
          // Add some styling for scrollbar
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: "4px",
          },
        }}
      >
        {/* Show Loading Indicator */}
        {loading ? (
          <Typography sx={{ color: "gray", textAlign: "center", py: 2 }}>
            Loading notes...
          </Typography>
        ) : filteredNotes.length === 0 ? (
          <Typography sx={{ color: "gray", textAlign: "center", py: 2 }}>
            {searchQuery.trim() !== "" ? "No matching notes found." : "No notes available."}
          </Typography>
        ) : (
          // Display Notes List
          filteredNotes.map((note) => (
            <Paper
              key={note.id}
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                backgroundColor: "#F5F5F5",
                borderLeft: "4px solid #1059a2",
              }}
              elevation={1}
            >
              <Box sx={{ width: "80%" }}>
                {editingNoteId === note.id ? (
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={editedNote}
                    onChange={(e) => setEditedNote(e.target.value)}
                    sx={{
                      backgroundColor: "#FFF176",
                      borderRadius: "8px",
                      padding: "5px",
                    }}
                  />
                ) : (
                  <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                    {note.note}
                  </Typography>
                )}
                <Typography variant="caption" sx={{ color: "gray", display: "block", mt: 1 }}>
                  {formatTimestamp(note.timestamp)}
                </Typography>
              </Box>

              <Box>
                {editingNoteId === note.id ? (
                  <Button
                    onClick={() => handleSaveEdit(note.id)}
                    sx={{ color: "green", mr: 1 }}
                  >
                    Save
                  </Button>
                ) : (
                  <IconButton 
                    onClick={() => handleEdit(note)} 
                    color="primary"
                    size="small"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
                <IconButton 
                  onClick={() => handleDelete(note.id)} 
                  color="error"
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          ))
        )}
      </Box>
    </Paper>
  );
}

export default NoteSection;