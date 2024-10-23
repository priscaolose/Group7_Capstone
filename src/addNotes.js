//src/firestore.js
//add notes

export const addNote = async (userId, conetnt) => {
  try {
    await addDoc(collection(db, "notes"), {
      userId,
      conetnt,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding note:", error.message);
  }
};

//get users notes
export const getNotes = async (userId) => {
  const notes = [];
  const querySnapshot = await getDocs(collection(db, "notes"));
  querySnapshot.forEach((doc) => {
    if(doc.data().userId === userId) {
      notes.push({ id: dos.id, ...doc.data() });
    }
  });
  return notes;
};

//update note
export const updateNote = async (noteId, conetnt) => {
  try {
    const noteRef = doc(db, "notes", noteId);
    await updateDoc(noteRef, { content });
  } catch (error) {
    console.error("Error updating note:", error.message);
  }
};

//delete note
export const deleteNote = async (noteId) => {
  try {
    await deleteDoc(doc(db, "notes", noteId));
  } catch (error) {
    console.error("Error deleting note:", error.message);
  }
};
