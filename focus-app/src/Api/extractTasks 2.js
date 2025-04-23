import { collection, query, where, getFirestore,getDocs} from "firebase/firestore";
import { useEffect,useState } from 'react';
import { useLocation } from "react-router-dom";
import { getUID } from "../firebase/firebaseAuth";
const useTasks = (userEmail) => {
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [tasks, setTasks] = useState([]);  
    // Firebase setup
    const db = getFirestore();
    const Tasks = collection(db, "tasks");
    console.log("function was called")
    console.log("user email",userEmail);
    useEffect(() => {
      const fetchTasks = async () => {
        const nameQuery = query(Tasks, where("userId", "==", userEmail));
        
        // try {
        //   const querySnapshot = await getDocs(nameQuery);
        //   const tasksArray = [];
          
        //   querySnapshot.forEach((doc) => {
        //     tasksArray.push({ id: doc.id, ...doc.data() });
        //   });
        //   console.log("tasksArray",tasksArray)
          
        //   setTasks(tasksArray);
        //   setLoading(false);
        // } catch (error) {
        //   setError("Error getting documents: " + error.message);
        //   setLoading(false);
        // }
        try {
          const uid = await getUID(user?.email)
          console.log("UID: " + uid);
          const task = await fetch(`/api/getTask?userID=${uid}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await task.json();
          setTasks(data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
    fetchTasks();
    }, [userEmail]); 
    return { tasks, error,loading };
};

export default useTasks;