//creates Task
//taskController.js

import { db } from '.firebaseConfig';
import { ref, push, update } from "firebase/database";

export const createTask = async (req, res) => {
    const { userID, taskName, duration, description, subTasks } = req.body;

     try {
          const newTaskRef = push(ref(db, `tasks/${userID}`));
          const taskData = { taskName, duration, description, subTasks, status: 'in-progress' };
       
          await update(newTaskRef, taskData);
          res.status(201).json({ taskID: newTaskRef.key });
     } catch(error) {
          res.status(500).json({ message: error.message });
     }
};
