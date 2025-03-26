import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "./CSSFolders/Login.css";
import Googlelogo from "./Images/googleLogo.png";
import { Grid2, Box, TextField, Button, InputAdornment, IconButton, Typography,Dialog,DialogTitle,DialogContent,DialogActions } from '@mui/material';
import {
  signInWithGoogle,
  checkIfEmailExists,
  getUsersName,
} from "./firebase/firebaseAuth";
import { auth } from "./firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { useUser } from "./Components/context";
const Login = ({ login, loggedIn, logout }) => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [password, setPassword] = useState("");
  const [isLocked, setIsLocked] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const { setUser, setTasks } = useUser();


  console.log("setUser", setUser);
  console.log("loggedin:", loggedIn);
  console.log("logout:", logout);
  
  const navigate = useNavigate();

  const onButtonClick = () => {
    setErrors({});

    const newErrors = {};

    if (email === "") {
      newErrors.email = "Please enter your email";
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (password === "") {
      newErrors.password = "Please enter a password";
    }

    // If there are errors, update state and exit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    handleLogin(email, password);
  };

  const TaskDialog = ({ open, onClose }) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx ={{ color: "red"}}>Failed Sign In</DialogTitle>
        <DialogContent >
          Sign in failed. Please try again.
        </DialogContent>
        <DialogActions>
          <Button 
          sx={{
            padding: '8px 1px',
            backgroundColor: '#8AAEC6',
            cursor: 'pointer',
            color: 'white',
            width: '10px',
            fontSize: '16px',
            }}
          onClick={onClose}>
          Ok</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleForgotPassword = () => {
    alert("Forgot Password Clicked");
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      if (!result?.user?.email) {
        alert("Failed to get user email");
        return;
      }
      console.log("calling the check if email exists");
      console.log("result?.user?.email", result?.user?.email);
      // Check if email exists in your system
      const emailExists = await checkIfEmailExists(result.user.email);
      console.log("emailExists", emailExists);
      if (emailExists) {
        const firstName = await getUsersName(result.user.email);
        const userData = { firstName: firstName , email: result.user.email};
        console.log("userData", userData);
        setUser(userData);
        const task = await fetch(
          `/api/getTask?userID=${userData.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const taskList = await task.json();
        setTasks(taskList);
        console.log("email,",result.user.email)
        // Existing user - proceed to home
        navigate("/dashboard", { state: { email: result.user.email } });
      } else {
        // New user - create account first
        if (
          window.confirm(
            "No account found with these details. Click OK to sign up and create an account."
          )
        ) {
          window.location.href = "/registration"; // Redirects to the registration page
        }
      }
      login(); // Call the login function passed as a prop to set loggedIn to true
    } catch (error) {
      setIsOpen(true); 
      console.log(error);
    }
  };
  const handleDialogClose = () => {
    setIsOpen(false); 
  }

  const handleAccountRegistration = () => {
    navigate("/registration");
  };

  const handlePasswordIconClick = () => {
    if (password !== "") {
      setIsLocked(!isLocked);
    }
  };

  async function handleLogin(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Uid",user.uid)
      console.log("user",user)
      console.log("EMail",email)
      if (user) {
        const response = await fetch(
          `/api/login?email=${encodeURIComponent(email)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const task = await fetch(
          `/api/getTask?userId=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );if(task){console.log("tasks",task)}else{console.log("no tasks")}
        setEmail("");
        setPassword("");

        const taskList = await task.json();
        setTasks(taskList);
        const data = await response.json();
        console.log("data",data)
        if (response.ok && data.name) {
          const userData = { firstName: data.name, email: data.email };
          setUser(userData);
          console.log("userData",userData);
          console.log("data.email",data.email)
          navigate('/dashboard', { state: { email: email } });
          login(); // Call the login function passed as a prop to set loggedIn to true
        }
        else{
          console.log("It did not get in here")
        }
      } 
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else if (error.code === "auth/too-many-requests") {
        alert(
          "Too many unsuccessful attempts. Please wait and try again later."
        );
        //This is just a temporal holder for what i am testing
      } else if (error.code === "auth/invalid-credential") {
        if (
          window.confirm(
            "No account found with these details. Click OK to sign up and create an account."
          )
        ) {
          window.location.href = "/registration"; // Redirects to the registration page
        }
      } else {
        alert("Error logging in:" + error.code);
      }
    }
  }

  return (
    <div className="mainContainer">
      <Header loggedIn={loggedIn} logout={logout} />
      <div className="loginForm">
        <h1 className="loginFormHeading">Welcome Back</h1>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            onButtonClick();
          }}
        >
          <div className="inputContainer">
            <div className="inputWrapper">
              <input
                value={email}
                placeholder="Email"
                onChange={(ev) => setEmail(ev.target.value)}
                className={`inputBox ${errors.email ? "error" : ""}`}
                required
              />
              <i className="fas fa-envelope icon"></i>
            </div>
            <div className="errorMessage">{errors.email}</div>
          </div>

          <div className="inputContainer">
            <div className="inputWrapper">
              <input
                value={password}
                placeholder="Password"
                onChange={(ev) => setPassword(ev.target.value)}
                className={`inputBox ${errors.password ? "error" : ""}`}
                type={isLocked ? "password" : "text"}
                required
              />
              <i
                className={`fa-solid ${
                  isLocked ? "fa-eye-slash" : "fa-eye"
                } icon`}
                onClick={handlePasswordIconClick}
              ></i>
            </div>
            <div className="errorMessage">{errors.password}</div>
            <p className="forgotPasswordText" onClick={handleForgotPassword}>
              Forgot Password?
            </p>
          </div>

          {errors.login && (
            <div className="errorMessage loginError">{errors.login}</div>
          )}

          <div className="inputButtonContainer">
            <input className="inputButton" type="submit" value="Sign in" />
          </div>

          <p className="registerText">
            Don't have an account?{" "}
            <span
              className="clickableRegister"
              onClick={handleAccountRegistration}
            >
              Register
            </span>
          </p>
        </form>

        {isOpen && (
          <TaskDialog
            open={isOpen}
            onClose={handleDialogClose}
          />
        )}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="googleSignInContainer">
          <div className="googleSignInText">Sign In With</div>
          <img
            src={Googlelogo}
            onClick={handleGoogleSignIn}
            alt="GoogleLogo"
            className="google-logo"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
