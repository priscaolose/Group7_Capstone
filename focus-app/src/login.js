import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './CSSFolders/Login.css'; 
import Googlelogo from './Images/googleLogo.png';
import { signInWithGoogle } from './firebase/firebaseAuth'; 
import { auth } from './firebase/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLocked, setIsLocked] = useState(true);

  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmailError('');
    setPasswordError('');

    if (email === '') {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    // Call the handleLogin function with email and password
    handleLogin(email, password);
  };

  const handleForgotPassword = () => {
    alert('Forgot Password Clicked');
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        navigate('/home'); // Navigate to home or desired route after successful sign-in
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  const handleAccountRegistration = () => {
    navigate('/registration');
  };

  const handlePasswordIconClick = () => {
    if (password !== '') {
      setIsLocked(!isLocked);
    }
  }
  
  async function handleLogin(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user);
      alert("Login successful!");
      
      // Optionally navigate or clear inputs after successful login
      setEmail('');
      setPassword('');
      navigate('/home'); // Redirect to home or desired route
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login error: " + error.message);
    }
  }

  return (
    <div className="mainContainer">
      <Header /> {/* Header Component */}  
      <div className="loginForm">
        <h1 className="loginFormHeading">Welcome Back </h1>
        <form onSubmit={(ev) => { ev.preventDefault(); onButtonClick(); }}>
          <div className="inputContainer">
            <div className="inputWrapper">
              <input
                value={email}
                placeholder="Email"
                onChange={(ev) => setEmail(ev.target.value)}
                className="inputBox"
                required
              />
              <i className="fas fa-envelope icon"></i> {/* Envelope icon */}
            </div>
            <label className="errorLabel">{emailError}</label>
          </div>

          <div className="inputContainer">
            <div className="inputWrapper">
              <input
                value={password}
                placeholder="Password"
                onChange={(ev) => setPassword(ev.target.value)}
                className="inputBox"
                type={isLocked ? "password" : "text"} // Toggle input type for visibility
                required
              />
              <i
                className={`fa-solid ${isLocked ? 'fa-lock' : 'fa-lock-open'} icon`}
                onClick={handlePasswordIconClick}
              ></i>
            </div>
            <label className="errorLabel">{passwordError}</label>
            <p className="forgotPasswordText" onClick={handleForgotPassword}>Forgot Password?</p>
          </div>

          <div className="inputButtonContainer">
            <input className="inputButton" type="submit" value="Sign in" />
          </div>
          <p className="registerText">
            Don't have an account?{' '}
            <span className="clickableRegister" onClick={handleAccountRegistration}>
              Register
            </span>
          </p>
        </form>
        <div className="googleSignInContainer">
        <div className="googleSignInText">Sign In With</div>
        <img src={Googlelogo} onClick={handleGoogleSignIn} alt="GoogleLogo" className="google-logo" /> {/* Logo image */}
        </div>
      </div>
      <Footer /> {/* Footer Component */}
    </div>
  );
};

export default Login;
