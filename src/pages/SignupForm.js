import React, { useState } from "react";
import "./sign.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserRegistrationSidebar = ({ isOpen, onClose, onShow }) => {
  // State to manage registration form inputs
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/users`, {
        name,
        lastName,
        email,
        password,
      });
  
      console.log("Response status:", response.status); // Add this line to check response status
  
      if (response.status === 201) {
        console.log("User registered successfully");
        const userData = { name, lastName, email };
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        toast.success("register successful!", {
          position: "top-right",
          autoClose: 3000, 
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      const errorMessage = error.response?.data?.message || "register error!, please try again";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000, 
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
          <p>Tu as un compte ? <a href="#" onClick={onShow}>Login</a></p>

        </form>
      </div>
    </div>
  );
};

export default UserRegistrationSidebar;
