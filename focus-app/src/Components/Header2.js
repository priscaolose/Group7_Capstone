import React from "react";
import { useNavigate } from "react-router-dom"; // Import the hook for navigation
import logo from "../Images/Focus-8.png"; // Import the logo image
import Navbar from "./navBar"; // Import Navbar component
import "../CSSFolders/Header.css";
import Homepage from "../Homepage";
import { useUser } from "./context";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Cookies from 'js-cookie';

const Header2 = () => {
  const navigate = useNavigate();
  const { setUser, setTasks } = useUser();

  const HandleLogout = async () => {
    // Optional: Add any logout logic here (e.g., clearing auth tokens or session)
    try {
      await signOut(auth);
      const cookies = Cookies.get();
      Object.keys(cookies).forEach(cName =>
        Cookies.remove(cName, { path: '/'})
      );
      setUser(null);
      setTasks(null);
      localStorage.removeItem("tasks");
      navigate("/login"); // Redirect to the login page after logout
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo"
        className="header-logo"
        onClick={() => navigate("/Homepage")} // Navigate to the home page when logo is clicked
        style={{ cursor: "pointer" }} // Optional: Show pointer cursor
      />
      <div className="navAndLogOut">
        <Navbar />
        <input
          className="logOutButton"
          type="submit"
          value="Log Out"
          onClick={HandleLogout} // Call HandleLogout on click
          sx={{ color: "white" }}
        />
      </div>
    </header>
  );
};

export default Header2;
