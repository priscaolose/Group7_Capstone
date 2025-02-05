
import { getFirestore } from "firebase/firestore";
import { ref, update } from "firebase/database"; 
import app from '../firebase/firebaseConfig';
import { v4 as uuidv4 } from "uuid"; 
const db = getFirestore(app);

export const editTask = async (req, res) => {
    const { userID, taskID, updatedData } = req.body;

    try {
        const taskRef = ref(db, `tasks/${userID}/${taskID}`);
        await update(taskRef, updatedData);
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};