
import { updateDoc } from "firebase/firestore";
import app from '../firebase/firebaseConfig';
import { getFirestore,getDoc,doc} from "firebase/firestore";
import { useEffect,useState } from 'react';

const db = getFirestore(app);

//update tasks (ex. mark complete)

const useUpdateTask = () => {
  console.log("function was called")
    const updateTask = async (taskId, updatedData) => {
      try {
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, updatedData);
        console.log("task ref",taskRef)
        console.log("updated data", updatedData);
        console.log("Task updated successfully!");
      } catch (error) {
        console.error("Error updating task:", error.message);
      }
    };
  
    return updateTask;
  };
  

const useGetTasks = (userId) => {
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [tasks, setTasks] = useState([]);  
    // Firebase setup
    const db = getFirestore();

    useEffect(() => {
      const fetchTasks = async () => {
        try {
            const docRef = doc(db, "tasks", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setTasks(docSnap.data());
              console.log("docSnap.data",docSnap.data)
              console.log("tasks",tasks);
              console.log("userId",userId)
            } else {
              console.log("No such document!")
            }
        } catch (error) {
          setError("Error getting documents: " + error.message);
          setLoading(false);
        }
      };
        if(userId)
        fetchTasks();
    }, [userId]); 
    return { tasks };
};


export {useGetTasks,useUpdateTask};