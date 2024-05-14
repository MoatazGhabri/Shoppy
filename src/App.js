import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from 'react';

import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Women from "./pages/Women";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(''); // State to store admin name

  const handleLoginSuccess = (userName) => {
    setIsLoggedIn(true);
    setUserName(userName); 
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  }
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Women" element={<Women />} />


          <Route path="*" element={<> not found</>} />
        </Routes>
        <ToastContainer /> 
    </Router>
    
  );
}

export default App;