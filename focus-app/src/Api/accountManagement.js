import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

async function updateUserInfo(user, formData) {
    const userCollection = collection(db, 'Users');
    const q = query(userCollection, where('username', '==', user.uid));
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

export { updateUserInfo };
