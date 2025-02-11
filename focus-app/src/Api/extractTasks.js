import { collection, query, where, getFirestore,getDocs} from "firebase/firestore";
import { useEffect,useState } from 'react';

const useTasks = (userEmail) => {
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [tasks, setTasks] = useState([]);  
    // Firebase setup
    const db = getFirestore();
    const Tasks = collection(db, "tasks");

    
    useEffect(() => {
      const fetchTasks = async () => {
        const nameQuery = query(Tasks, where("userId", "==", userEmail));
        
        try {
          const querySnapshot = await getDocs(nameQuery);
          const tasksArray = [];
          
          querySnapshot.forEach((doc) => {
            tasksArray.push({ id: doc.id, ...doc.data() });
          });
          console.log("tasksArray",tasksArray)
          
          setTasks(tasksArray);
          setLoading(false);
        } catch (error) {
          setError("Error getting documents: " + error.message);
          setLoading(false);
        }
      };
    
      if (userEmail) {
        fetchTasks();
      }
    }, [userEmail]); 
    return { tasks, error,loading };
};

export default useTasks;