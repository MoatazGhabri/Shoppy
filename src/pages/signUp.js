import React, { useState } from "react";
import "./sign.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserLoginSidebar = ({ isOpen, onClose, onShowRegistration, setIsLoggedIn }) => {
  // State to manage login form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Check if both email and password are provided
      if (!email || !password) {
        console.error("Please provide both email and password.");
        return;
      }

      // Implement your actual login API call using axios
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("User logged in successfully");
        localStorage.setItem('token', response.data.token);

        setIsLoggedIn(true); // Update the parent component's isLoggedIn state
        onClose(); // Close the login sidebar

        // Show a success notification
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000, // Notification will close after 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        console.error("Login failed. Please check your credentials.");
       
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid credentials. Please try again.",{
        position: "top-right",
        autoClose: 3000, // Notification will close after 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Handle error, show error message, etc.
    }
  };
  return (
    <div className={`user-login-sidebar ${isOpen ? "open" : ""}`}>
      <div className="user-login-content">
        <h2>Login</h2>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <form>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleLogin}>
            Se connecter
          </button>
          <p>
            Tu n'as pas de compte ?{" "}
            <a href="#" onClick={onShowRegistration}>
              Inscris-toi
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLoginSidebar;
