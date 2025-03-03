import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; 
import { useUser } from "./context";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { format } from "date-fns";  


function NoteSection() {
  const { user } = useUser();
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([]);
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
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user]);

const formatTimestamp = (timestamp) => {
  if (!timestamp) return "No date";

  const now = new Date(); // Current time
  const noteDate = new Date(timestamp); // Convert Firestore timestamp to Date
  const isToday = format(noteDate, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
  const isYesterday =
    format(noteDate, "yyyy-MM-dd") ===
    format(new Date(now.setDate(now.getDate() - 1)), "yyyy-MM-dd");

  if (isToday) {
    return `Today at ${format(noteDate, "h:mm a")}`; // Example: "Today at 3:45 PM"
  } else if (isYesterday) {
    return `Yesterday at ${format(noteDate, "h:mm a")}`; // Example: "Yesterday at 11:30 AM"
  } else {
    return `${format(noteDate, "MMM d, yyyy")} at ${format(noteDate, "h:mm a")}`; // Example: "Feb 10, 2024 at 8:00 PM"
  }
};

  // Save a new note to Firebase
  const handleNote = async () => {
    if (!note.trim()) {
      setMessage("Please enter a note before saving.");
      return;
    }

    try {
      const newNoteRef = await addDoc(collection(db, "Notes"), {
        userName: user?.firstName || "Guest",
        note: note,
        timestamp: new Date(),
      });

      setNotesList([...notesList, { id: newNoteRef.id, note }]);
      setNote("");
      setMessage("Note added successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving note:", error);
      setMessage("Failed to save note. Try again.");
    }
  };

  //  Delete a note from Firebase
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Notes", id));
      setNotesList(notesList.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  //  Enable edit mode for a note
  const handleEdit = (note) => {
    setEditingNoteId(note.id);
    setEditedNote(note.note); // Set existing note text in the input
  };

  //  Save edited note to Firebase
  const handleSaveEdit = async (id) => {
    try {
      await updateDoc(doc(db, "Notes", id), { note: editedNote });

      //  Update the note in UI
      setNotesList(notesList.map((n) => (n.id === id ? { ...n, note: editedNote } : n)));
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
          rows={4}
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
            padding: "auto",
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

      {/* Show Loading Indicator */}
      {loading ? (
        <Typography sx={{ color: "gray", mt: 2 }}>Loading notes...</Typography>
      ) : notesList.length === 0 ? (
        <Typography sx={{ color: "gray", mt: 2 }}>No notes available.</Typography>
      ) : (
        // Display Notes List
        <Box sx={{ mt: 2, maxHeight: "40vh", overflowY: "auto" }}>
          {notesList.map((note) => (
            <Paper
              key={note.id}
              sx={{
                p: 2,
                mt: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
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
                  <Typography variant="body1">{note.note}</Typography>
                )}
                <Typography variant="caption" sx={{ color: "gray" }}>
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
                  <IconButton onClick={() => handleEdit(note)} color="primary">
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton onClick={() => handleDelete(note.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {/* Status Message */}
      {message && <Typography sx={{ color: "green", mt: 2 }}>{message}</Typography>}
    </Paper>
  );
}
export default NoteSection;