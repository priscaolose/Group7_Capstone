import React, { useState } from 'react';
import { auth } from './firebase/firebaseAuth';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import './CSSFolders/Registration.css'; 
import Header from './Components/Header';
import Footer from './Components/Footer';
import Googlelogo from './Images/googleLogo.png';
import { signUpWithGoogle, checkIfEmailExists, storeUserInDatabase, getUsersName } from './firebase/firebaseAuth'; 
import { useNavigate } from 'react-router-dom';
import { useUser } from './Components/context';
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Register = () => {
    const theme = createTheme({
        typography: {
          fontFamily: '"Poppins", sans-serif',
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 500,
          },
          body1: {
            fontWeight: 400,
          },
        },
        palette: {
          primary: {
            main: "#1059a2",
          },
          background: {
            default: "#f4f6f8",
          },
        },
    });
    
    // Define isSmallScreen using useMediaQuery
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({}); // Single object to hold all error messages
    const [isLocked, setIsLocked] = useState(true);
    const { setUser, setTasks } = useUser();

    const navigate = useNavigate();
    const handleAccountLogin = () => {
        navigate('/login');
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

    const onButtonClick = (e) => {
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
        console.log("email",email)
        handleRegister(e);
    };

    const handleGoogleSignUp = async (navigate) => {
        try {
            const result = await signUpWithGoogle();
            const emailExists = await checkIfEmailExists(result.user.email);
            if (emailExists) {
                alert('Email already exists. Please sign in instead.');
                navigate('/login'); // Navigate to login or desired route after successful sign-in
            }
            if (result.user) {
                console.log('Signed Up With Google Clicked',result.user.email);
                await storeUserInDatabase(result.user);
                const firstName = await getUsersName(result.user.email);
                const userData = {
                    firstName: firstName,
                    email: result.user.email,
                };
                setUser(userData);
                setTasks([]);
                localStorage.setItem('newUser', 'true');
                navigate('/dashboard', { state: { email: result.user.email } });
            }
        } catch (error) {
            console.error("Error during Google Sign-Up:", error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
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
                    userName: user.uid || user.username,
                    phonenumber: phone,
                    password,
                }),
            });
            localStorage.setItem('uid', user.uid);
            console.log("localStorage.getItem('userName')",localStorage.getItem('userName'));
            const userData = { firstName: firstName, email: email};
            setUser(userData);
            setTasks([]);


            // Log the raw response text
            const responseText = await response.text();
            console.log("Raw response:", responseText);

            // First check if response is ok
            if (!response.ok) {
                const errorData = JSON.parse(responseText); // Now safe to parse
                throw new Error(errorData.error || 'Registration failed');
            }

            const result = JSON.parse(responseText); // Now safe to parse
            localStorage.setItem('newUser', 'true');
            navigate('/dashboard', { state: { email: user.email } });
            setSuccessMessage(result.message);

        } catch (error) {
            console.error("Error registering user:", error);
            alert(error.message);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            {/* Root container - fixed height with no overflow */}
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100vh',
                width: '100%',
            }}>  
                {/* Header - fixed at the top */}
                <Header />
                
                {/* Main content area - this is the scrollable container */}
                <Box sx={{
                    flex: '1',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    px: isSmallScreen ? 2 : 6,
                    py: isSmallScreen ? 5 : 5,
                    backgroundColor: "white",
                    overflow: "auto", // This enables scrolling for this box only
                    width: '100%'
                }}>
                    <div className='register-form'>
                        <h1 className='heading'> Hi There!</h1>
                        <h2 className='caption'> Create an Account</h2>
                        <form onSubmit={(e) => { e.preventDefault(); onButtonClick(); }}>
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
                                        className={`fa-solid ${isLocked ? 'fa-eye-slash' : 'fa-eye'} icon`}
                                        onClick={handlePasswordIconClick}
                                    ></i>
                                </div>
                                <label className="errorLabel">{errors.password}</label>
                            </div>
                            <input className="inputButton" type="button" onClick={onButtonClick} value="Sign Up" />
                        </form>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        <div className="googleSignInContainer">
                            <div className="googleSignInText">Sign Up With</div>
                            <img 
                                src={Googlelogo} 
                                onClick={() => handleGoogleSignUp(navigate)} 
                                alt="GoogleLogo" 
                                className="google-logo" 
                            />
                        </div>
                        <div className="alreadyHaveAnAccount"> 
                            Already have an account? 
                            <span className="clickableRegister" onClick={handleAccountLogin}>
                                Sign in 
                            </span>
                        </div>
                    </div>
                </Box>
                
                {/* Footer - fixed at the bottom */}
                <Box sx={{ 
                    width: '100%',
                    zIndex: 10, // Ensure footer appears above other content
                    position: '' // Helps with z-index stacking
                }}>
                    <Footer />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Register;