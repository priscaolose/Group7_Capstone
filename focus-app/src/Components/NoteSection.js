import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; 
import { useUser } from "./context";
import { collection, query, where, orderBy, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { format } from "date-fns"; // Install with: npm install date-fns
import SwapVertIcon from '@mui/icons-material/SwapVert';

function NoteSection() {
  const { user } = useUser();
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNote, setEditedNote] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  // Format timestamps for user-friendly display
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "No date";

    const now = new Date();
    const noteDate = new Date(timestamp);
    const isToday = format(noteDate, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
    const isYesterday =
      format(noteDate, "yyyy-MM-dd") ===
      format(new Date(now.setDate(now.getDate() - 1)), "yyyy-MM-dd");

    if (isToday) {
      return `Today at ${format(noteDate, "h:mm a")}`;
    } else if (isYesterday) {
      return `Yesterday at ${format(noteDate, "h:mm a")}`;
    } else {
      return `${format(noteDate, "MMM d, yyyy")} at ${format(noteDate, "h:mm a")}`;
    }
  };

  // Fetch notes in real-time, sorted by latest timestamp
  useEffect(() => {
    if (!user) return;

    const notesRef = collection(db, "Notes");
    const q = query(notesRef, where("userName", "==", user.firstName), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedNotes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate(),
      }));
      setNotesList(fetchedNotes);
    });

    return () => unsubscribe(); // ✅ Clean up listener when component unmounts
  }, [user]);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  // ✅ Save a new note to Firebase
  const handleNote = async () => {
    if (!note.trim()) {
      setMessage("Please enter a note before saving.");
      return;
    }

    setLoading(true);
    try {
      const newNoteRef = await addDoc(collection(db, "Notes"), {
        userName: user?.firstName || "Guest",
        note: note,
        timestamp: new Date(),
      });

      setNote("");
      setMessage("Note saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving note:", error);
      setMessage("Failed to save note. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete a note from Firebase
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Notes", id));
      setMessage("Note deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting note:", error);
      setMessage("Failed to delete note.");
    }
  };

  // ✅ Enable edit mode for a note
  const handleEdit = (note) => {
    setEditingNoteId(note.id);
    setEditedNote(note.note);
  };

  // ✅ Save edited note to Firebase
  const handleSaveEdit = async (id) => {
    try {
      await updateDoc(doc(db, "Notes", id), { note: editedNote });
      setEditingNoteId(null);
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
      {/* Title & Sort Button in One Row */}
<Box sx={{ alignItems: "center", gap: 1, mb: 2 }}>
  <Typography variant="h6" sx={{ color: "#1059a2" }}>
    Notes
  </Typography>

  {/* Sort Button */}
  <IconButton onClick={toggleSortOrder} sx={{ color: "#1059a2" }}>
    <SwapVertIcon />
  </IconButton>
</Box>

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
            backgroundColor: "#FFF176",
            borderRadius: "8px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
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

      {/* Display Notes List */}
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
                  sx={{ backgroundColor: "#FFF176", borderRadius: "8px", padding: "5px" }}
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
                <Button onClick={() => handleSaveEdit(note.id)} sx={{ color: "green", mr: 1 }}>
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

      {/* Status Message */}
      {message && <Typography sx={{ color: "green", mt: 2 }}>{message}</Typography>}
    </Paper>
  );
}

export default NoteSection;
