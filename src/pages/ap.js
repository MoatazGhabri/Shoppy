import React, { useState } from 'react';
import Modal from './Users'; // Assuming Modal component is in Modal.js

function Ap() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = async (userData) => {
    // Make API call to login route
    console.log('Logging in', userData);
  };

  const handleSignup = async (userData) => {
    // Make API call to signup route
    console.log('Signing up', userData);
  };

  return (
    <div className="App">
      <button onClick={() => setIsModalOpen(true)}>Login/Signup</button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
}

export default Ap;
