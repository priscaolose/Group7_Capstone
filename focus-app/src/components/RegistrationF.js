import React, { useState } from 'react'
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Registration.css';


const Register =()=>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e) => {
       // e.preventDefault(); //prevents the browser reloading the page while submiting the registration form

        try {
            // Step 1: Register the user with Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User registered with Firebase:", user);

            // Step 2: Send user data to backend
            const token = user && (await user.getIdToken());
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
                setSuccessMessage('Registration succesfult!');
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhone('');
                setPassword('');
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error("Error registering user:", error.message);
            alert("Registration failed: " + error.message);
        }
    };

    return (
        <div className='register-form'>
            <h2 className='heading'> Hi There!</h2>
            <h3 className='caption'> Create an Account</h3>
            <form onSubmit={handleRegister}>
                <label className='input-label'>
                   
                    <input
                        type='text'
                        placeholder='First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
    
                <label className='input-label'>
                    
                    <input
                        type='text'
                        placeholder='Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
    
                <label className='input-label'>
                    
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
    
                <label className='input-label'>
                   
                    <input
                        type='tel'
                        placeholder='Phone'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </label>
    
                <label className='input-label'>
                    
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
    
                <button type='submit'>Sign Up</button>
            </form>

            {/* Success message section */}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
    
};
export default Register;