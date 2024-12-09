/*import { doc, setDoc, getDocs, query, where, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

const StoreUserInDatabase = async (user) => {
  const usersRef = collection(db, "Users");
  const q = query(usersRef, where("displayName", "==", user.displayName));

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // If there is a user with the same name, throw an error
      alert(`A user with the name ${user.email} already exists.`);
      throw new Error(`A user with the name "${user.displayName}" already exists.`);
    }

    // Proceed to store the new user if no conflict
    const userDocRef = doc(db, "Users", user.uid); 
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };

    await setDoc(userDocRef, userData, { merge: true });
    console.log("User successfully stored in the database");

  } catch (error) {
    console.error("Error storing user data:", error);
    throw error;  
  }
};

export default StoreUserInDatabase;
*/