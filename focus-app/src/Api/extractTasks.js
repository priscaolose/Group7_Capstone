import { collection, query, where, getFirestore,getDocs} from "firebase/firestore";
import { useEffect,useState } from 'react';
import { useLocation } from "react-router-dom";
import { getUID } from "../firebase/firebaseAuth";
import { useUser } from "../Components/context";
import {getTasks2} from "./createTask" ;
const useTasks = (userEmail) => {
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const [tasks, setTasks] = useState([]);  
  // Firebase setup
  const db = getFirestore();
  const Tasks = collection(db, "tasks");
  console.log("function was called")
  console.log("user email",userEmail);
  const { user } = useUser();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const uid = await getUID(user?.email)
        console.log("UID: " + uid);
        const task = await getTasks2(uid);
        console.log("task",task)
        setTasks(task);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  fetchTasks();
  }, [userEmail]); 
  return { tasks, error,loading };
};

export default useTasks;