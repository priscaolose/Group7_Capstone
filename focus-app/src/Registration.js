import React, { useState } from 'react';
import { auth } from './firebase/firebaseAuth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './CSSFolders/Registration.css'; 
import Header from './Components/Header';
import Footer from './Components/Footer';
import Googlelogo from './Images/googleLogo.png';
import { signUpWithGoogle } from './firebase/firebaseAuth'; 
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({}); // Single object to hold all error messages
    const [isLocked, setIsLocked] = useState(true);

    const navigate = useNavigate();

    const handleAccountSign = () => {
        alert('Sign Up Clicked');
        setEmail('');
        setPassword('');
        setLastName('');
        setFirstName('');
        setPhone('');
        setSuccessMessage('');
    };

    const isValidPhoneNumber = (phoneNumber) => {
        const regex = /^\+?1?\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
        return regex.test(phoneNumber);
    };

    const handlePasswordIconClick = () => {
        if (password !== '') {
            setIsLocked(!isLocked);
        }
    };

    const onButtonClick = () => {
        // Clear previous error messages
        setErrors({}); 

        // Create an errors object
        const newErrors = {};

        // Validate each input
        if (email === '') {
            newErrors.email = 'Please enter your email';
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (password === '') {
            newErrors.password = 'Please enter a password';
        } else if (password.length < 8) {
            newErrors.password = 'The password must be 8 characters or longer';
        }

        if (firstName === '') {
            newErrors.firstName = 'Please enter your first name';
        }

        if (lastName === '') {
            newErrors.lastName = 'Please enter your last name';
        }

        if (phone === '') {
            newErrors.phone = 'Please enter your phone number';
        } else if (!isValidPhoneNumber(phone)) {
            newErrors.phone = 'Enter a valid number';
        }

        // If there are errors, update state and exit
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); // Set all errors at once
            return; // Exit the function if there are errors
        }

        handleAccountSign(); // Call this only after validation checks
    };

    const handleGoogleSignUp = async () => {
        try {
            const user = await signUpWithGoogle();
            if (user) {
                alert('Signed Up With Google Clicked');
                navigate('/home'); // Navigate to home or desired route after successful sign-in
            }
        } catch (error) {
            console.error("Error during Google Sign-Up:", error);
        }
    };
    
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevents the browser from reloading the page while submitting the registration form
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

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
                    userName: user.uid,
                    password,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Registration successful!');
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
        <div className="mainContainer">
            <Header />
            <div className='register-form'>
                <h1 className='heading'> Hi There!</h1>
                <h2 className='caption'> Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <div className='input-label'> 
                        <div className="inputWrapper">
                            <input
                                type='text'
                                placeholder='First Name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <i className="fas fa-user icon"></i>
                        </div>
                        <label className="errorLabel">{errors.firstName}</label>
                    </div>

                    <div className='input-label'>
                        <div className="inputWrapper">
                            <input
                                type='text'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                            <i className="fas fa-user icon"></i>
                        </div>
                        <label className="errorLabel">{errors.lastName}</label>
                    </div>

                    <div className='input-label'>
                        <div className="inputWrapper">
                            <input
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <i className="fas fa-envelope icon"></i>
                        </div>
                        <label className="errorLabel">{errors.email}</label>
                    </div>

                    <div className='input-label'>
                        <div className="inputWrapper">
                            <input
                                type='tel'
                                placeholder='Phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            <i className="fas fa-phone icon"></i>
                        </div>
                        <label className="errorLabel">{errors.phone}</label>
                    </div>

                    <div className='input-label'>
                        <div className="inputWrapper">
                            <input
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={isLocked ? "password" : "text"}
                                required
                            />
                            <i
                                className={`fa-solid ${isLocked ? 'fa-lock' : 'fa-lock-open'} icon`}
                                onClick={handlePasswordIconClick}
                            ></i>
                        </div>
                        <label className="errorLabel">{errors.password}</label>
                    </div>
                    <div className="inputButtonContainer">
                        <input className="inputButton" type="button" onClick={onButtonClick} value="Sign Up" />
                    </div>
                </form>
                {successMessage && <p className="success-message">{successMessage}</p>}
                <div className="googleSignInContainer">
    <div className="googleSignInText">Sign Up With</div>
    <img src={Googlelogo} onClick={handleGoogleSignUp} alt="GoogleLogo" className="google-logo" />
</div>

            </div>
            <Footer />
        </div>
    );
};

export default Register;
