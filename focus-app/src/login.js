import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './CSSFolders/Login.css'; 
import Googlelogo from './Images/googleLogo.png'; 

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

    handleAccountSign()
    // Authentication calls will be made here...
  };

  const handleForgotPassword = () => {
    alert('Forgot Password Clicked');
  };

  const handleGoogleSignIn = () => {
    alert('Sign in with Google Clicked');
  };

  const handleAccountRegistration = () => {
    navigate('/registration');
  };
  const handleAccountSign = () =>{
    alert('Sign In Clicked');
    setEmail('');
    setPassword('');
  }

  return (
    <div className="mainContainer">
      <Header /> {/* Header Component */}
      
      <div className="contentContainer">
        <div className="titleContainer">
          <div>Welcome Back</div>
        </div>
        <br />
        <div className="inputContainer">
          <input
            value={email}
            placeholder="Email"
            onChange={(ev) => setEmail(ev.target.value)}
            className="inputBox"
          />
          <i className="fas fa-envelope"></i> {/* Envelope icon */}
          <label className="errorLabel">{emailError}</label>
        </div>
        
        <br />
        <div className="inputContainer">
          <input
            value={password}
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
            className="inputBox"
          />
          
            <i class="fa-solid fa-lock toggle_password"></i>
          <label className="errorLabel">{passwordError}</label>
          <p className="forgotPasswordText" onClick={handleForgotPassword}>Forgot Password?</p>
        </div>


        <br />
        <div className="inputButtonContainer">
          <input className="inputButton" type="button" onClick={onButtonClick} value="Sign in" />
        </div>
        
        <p className="registerText">
          Don't have an account?{' '}
          <span className="clickableRegister" onClick={handleAccountRegistration}>
            Register
          </span>
        </p>
        <p className="googleSignInText" >Sign In With</p>
        <img src={Googlelogo} onClick={handleGoogleSignIn} alt="GoogleLogo" className="google-logo" /> {/* Logo image */}

      </div>

      <Footer /> {/* Footer Component */}
    </div>
  );
};

export default Login;
