import React, { useState } from "react";
import { auth } from "./firebase/firebaseAuth";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import "./CSSFolders/Registration.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Googlelogo from "./Images/googleLogo.png";
import {
  storeUserInDatabase,
  signUpWithGoogle,
  checkIfEmailExists,
  getUsersName,
} from "./firebase/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { useUser } from "./Components/context";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({}); // Single object to hold all error messages
  const [isLocked, setIsLocked] = useState(true);
  const { setUser } = useUser();

  const navigate = useNavigate();

  const isValidPhoneNumber = (phoneNumber) => {
    const regex = /^\+?1?\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return regex.test(phoneNumber);
  };

  const handlePasswordIconClick = () => {
    if (password !== "") {
      setIsLocked(!isLocked);
    }
  };

  const onButtonClick = (e) => {
    // Clear previous error messages
    setErrors({});

    // Create an errors object
    const newErrors = {};

    // Validate each input
    if (email === "") {
      newErrors.email = "Please enter your email";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (password === "") {
      newErrors.password = "Please enter a password";
    } else if (password.length < 8) {
      newErrors.password = "The password must be 8 characters or longer";
    }

    if (firstName === "") {
      newErrors.firstName = "Please enter your first name";
    }

    if (lastName === "") {
      newErrors.lastName = "Please enter your last name";
    }

    if (phone === "") {
      newErrors.phone = "Please enter your phone number";
    } else if (!isValidPhoneNumber(phone)) {
      newErrors.phone = "Enter a valid number";
    }

    // If there are errors, update state and exit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set all errors at once
      return; // Exit the function if there are errors
    }
    handleRegister(e);
  };

  /*
    // Separate function to check email
    const checkIfEmailExists = async (email) => {
        try {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        return methods.length > 0;
        } catch (error) {
        console.error("Error checking email:", error);
        throw error;
        }
    };
    */
  const handleGoogleSignUp = async (navigate) => {
    try {
      const result = await signUpWithGoogle();

      const emailExists = await checkIfEmailExists(result.user.email);
      if (emailExists) {
        alert("Email already exists. Please sign in instead.");
        navigate("/login");
        return;
      }

      // If the user doesn't exist, store the user in the database
      if (result.user) {
        console.log("Signed Up With Google Clicked", result.user.email);
        await storeUserInDatabase(result.user);
        const firstName = await getUsersName(result.user.email);
        const userData = { firstName: firstName };
        setUser(userData);
        navigate("/dashboard", { state: { email: result.user.email } }); // Redirect to add task page
      }
    } catch (error) {
      console.error("Error during Google Sign-Up:", error);
    }
  };

  // Update your client-side handler to match
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // ... Firebase auth code ...

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          userName: user.uid,
          phonenumber: phone, // Note: match the field name with server
          password,
        }),
      });

      const userData = { firstName: firstName };
      setUser(userData);

      // First check if response is ok
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      const result = await response.json();
      navigate("/dashboard", { state: { email: user.email } });
      setSuccessMessage(result.message);
    } catch (error) {
      console.error("Error registering user:", error);
      alert(error.message);
    }
  };

  return (
    <div className="mainContainer">
      <Header />
      <div className="register-form">
        <h1 className="heading"> Hi There!</h1>
        <h2 className="caption"> Create an Account</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onButtonClick();
          }}
        >
          <div className="input-label">
            <div className="inputWrapper">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <i className="fas fa-user icon"></i>
            </div>
            <label className="errorLabel">{errors.firstName}</label>
          </div>
          <div className="input-label">
            <div className="inputWrapper">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <i className="fas fa-user icon"></i>
            </div>
            <label className="errorLabel">{errors.lastName}</label>
          </div>

          <div className="input-label">
            <div className="inputWrapper">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="fas fa-envelope icon"></i>
            </div>
            <label className="errorLabel">{errors.email}</label>
          </div>

          <div className="input-label">
            <div className="inputWrapper">
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <i className="fas fa-phone icon"></i>
            </div>
            <label className="errorLabel">{errors.phone}</label>
          </div>

          <div className="input-label">
            <div className="inputWrapper">
              <input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <label className="errorLabel">{errors.password}</label>
          </div>
          <input
            className="inputButton"
            type="button"
            onClick={onButtonClick}
            value="Sign Up"
          />
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
      </div>
      <Footer />
    </div>
  );
};

export default Register;
