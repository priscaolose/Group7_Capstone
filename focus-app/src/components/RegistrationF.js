import React, { useState } from 'react'
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const Register =()=>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault(); //prevents the browser reloading the page while submiting the registration form

        try {
            // Step 1: Register the user with Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User registered with Firebase:", user);

            // Step 2: Send user data to backend
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    userName: user.uid, // Firebase UID
                    password, // needs to be encrypted
                }),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error("Error registering user:", error.message);
            alert("Registration failed: " + error.message);
        }
    };

    return(
        <div className='register-form'>
            <h2 className='heading'> Hi There!</h2>
            <form onSubmit={handleRegister}>
                <input
                    type='text'
                    placeholder='First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />

                <input
                    type='text'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    required
                />

                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type='tel'
                    placeholder='Phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type='submit'>Sign Up</button>
            </form>

        </div>
    );
};
export default Register;