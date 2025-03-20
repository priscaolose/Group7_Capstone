import { db } from '../firebase/firebaseConfig';
 import { collection, query, where, getDocs } from 'firebase/firestore';
 import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
 import { doc, updateDoc } from 'firebase/firestore';
 
 async function updateUserInfo(user, formData) {
     const userCollection = collection(db, 'Users');
     const q = query(userCollection, where("email", "==", user.email));
     console.log("form data,")
     const querySnapshot = await getDocs(q);
     if (!querySnapshot.empty) {
         const userDoc = querySnapshot.docs[0];
         await updateEmail(user, formData.email);
         if (formData.password) {
             await updatePassword(user, formData.password);
         }
         delete formData.password;
         await updateDoc(userDoc.ref, formData);
     }
 }

 async function extractUsersData(user) {
    console.log("user in extractData", user);
    const userCollection = collection(db, "Users");
    if (!user || !user.email) {
        console.error("Error: user.email is undefined or null", user);
        return null; 
    }
 
    const q = query(userCollection, where("email", "==", user.email));

    try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No matching user found.");
            return null; 
        }

        const userData = querySnapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data() 
        }));

        console.log("Extracted User Data:", userData);
        return userData[0]; 
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}
 
 export { updateUserInfo,extractUsersData };