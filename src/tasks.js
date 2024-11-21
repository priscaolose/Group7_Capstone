//src/firestore.js
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import app from './firebaseConfig';

const db = getFirestore(app);

//add new task
export const addTask = async (userId, taskName, startTime, endTime) => {
  try {
    await addDoc(collection(db, "tasks"), {
      userId, 
      taskName;
      startTime;
      endTime;
      completed: false, 
    });
  } catch (error) {
    console.error("Error adding task:", error.message);
  }
};

//get user tasks
export const getTasks = async (userId) => {
  const tasks = [];
  const querySnapshot = await getDocs(collection(db, "tasks"));
  querySnapshot.forEach((doc) => {
    if(doc.data().userId === userId) {
      tasks.push({ id: doc.id, ...doc.data() });
    }
  });
  return tasks;
};

//update task (eg mark completed)
export const updateTask = async (taskId, updatedData) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, updatedData);
  } catch (error) {
    console.error("Error updating task:", error.message);
  }
};

//delete task
export const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, "tasks", taskId));
  } catch (error) {
    console.error("Error deleting task:", error.message);
  }
};
