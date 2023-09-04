import React, { useState } from "react";
import "./sign.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserRegistrationSidebar = ({ isOpen, onClose, onShow, onRegistrationSuccess }) => {
  // State to manage registration form inputs
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/users", {
        name,
        lastName,
        email,
        password,
      });
  
      if (response.status === 201) {
        console.log("User registered successfully");
        const userData = { name, lastName, email };
        // Call a callback prop to pass the user data to the parent component
        onRegistrationSuccess(userData);
        // Optionally, navigate to a different page or show a success message
        toast.success("register successful!", {
            position: "top-right",
            autoClose: 3000, // Notification will close after 3 seconds
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("register error!, please try again", {
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
    <div className={`user-registration-sidebar ${isOpen ? "open" : ""}`}>
      <div className="user-registration-content">
        <h2>Créer un compte</h2>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <form>
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          
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
          <button type="button" onClick={handleRegistration}>
            CRÉER UN COMPTE
          </button>
          <p>Tu n'as pas de compte ? <a href="#" onClick={onShow}>Login</a></p>

        </form>
      </div>
    </div>
  );
};

export default UserRegistrationSidebar;
