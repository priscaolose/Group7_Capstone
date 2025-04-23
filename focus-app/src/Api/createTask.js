//src/firestone.js
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import app from '../firebase/firebaseConfig';
import { v4 as uuidv4 } from "uuid"; 
const db = getFirestore(app);

//add task
export const addTask = async (userId, title,description,
  dueDate,category,priority) => {
  const taskID = uuidv4(); 
  try {
    await addDoc(collection(db, "tasks"), {
      taskID,
      userId,
      title,
      description,
      dueDate,
      completed: false,
      category,
      priority,
    });
  } catch (error) {
      console.error("Error adding task:", error.message);
  }
};

//get user tasks
export const getTasks = async (userId) => {
  const tasks = [];
  const querySnapshot = await getDocs(collection(db, "tasks"));
  querySnapshot.forEach((doc => {
    if(doc.data().uid === userId) {
      tasks.push({ id: doc.id, ...doc.data() });
    }
  }));
  if(querySnapshot.empty)
  {
    tasks.push([]);
  }
  return tasks;
};

export const getTasks2 = async (userId) => {
  const tasks = [];
  const querySnapshot = await getDocs(collection(db, "tasks"));
  querySnapshot.forEach((doc => {
    if(doc.data().userId === userId) {
      tasks.push({ id: doc.id, ...doc.data() });
    }
  }));
  if(querySnapshot.empty)
  {
    tasks.push([]);
  }
  return tasks;
};

//update tasks (ex. mark complete)
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
    console.log(`Task ${taskId} deleted successfully.`);
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error deleting task:", error.message);
    return false; // Return false to indicate failure
  }
};