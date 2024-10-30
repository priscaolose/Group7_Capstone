import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';

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
          <label className="errorLabel">{passwordError}</label>
        </div>
        <p className="forgotPasswordText" onClick={handleForgotPassword}>Forgot Password?</p>
        <br />
        <div className="inputContainer">
          <input className="inputButton" type="button" onClick={onButtonClick} value="Sign in" />
        </div>
        <p className="registerText">
          Don't have an account?{' '}
          <span className="clickableRegister" onClick={handleAccountRegistration}>
            Register
          </span>
        </p>
        <p className="googleSignInText" onClick={handleGoogleSignIn}>Sign In With</p>
      </div>

      <Footer /> {/* Footer Component */}
    </div>
  );
};

export default Login;
