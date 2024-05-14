import React, { useState } from "react";
import UserRegistrationSidebar from "./UserRegistrationSidebar";

const ParentComponent = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegistrationSuccess = (userData) => {
    // Handle successful registration here, e.g., set a state or perform other actions
    console.log("User registered successfully:", userData);
    setRegistrationSuccess(true);
  };

  return (
    <div>
      {/* Render other components */}
      <UserRegistrationSidebar onRegistrationSuccess={handleRegistrationSuccess} />
    </div>
  );
};

export default ParentComponent;
