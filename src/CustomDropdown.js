import React, { useState } from 'react';
import './CustomDropdown.css'; // Import the custom CSS file
import PanelItemDropdown from './PanelItemDropdown'; // Import the PanelItemDropdown component

const CustomDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <a href="#" className="dropdown-trigger" onClick={toggleDropdown}>
        Cart <i className="bi bi-cart"></i> <span id="cart-count">0</span>
      </a>
      {isDropdownOpen && (
        <div className="dropdown-content" onClick={closeDropdown}>
          {/* Dropdown content here */}
          <PanelItemDropdown
            productId={1}
            onRemove={(productId) => console.log(`Remove product ${productId}`)}
            onPurchase={(productId) => console.log(`Purchase product ${productId}`)}
          />
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
