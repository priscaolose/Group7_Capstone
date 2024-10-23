//authController.js
const { getAuth } = require('firebase/auth');

//login func. (client-side token verif. can be done here)
const loginUser = async(email, password) => {
  try{
    const userCredential = await getAuth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch(error){
    console.error('Error loggin in user:', error);
    throw error;
  }
};
