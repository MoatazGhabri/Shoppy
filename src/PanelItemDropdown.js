import React from "react";
import "./App.css";

const PanelItemDropdown = ({ productId, onRemove, onPurchase }) => {
  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle-btn"
        type="button"
        id={`dropdownMenu${productId}`}
        aria-haspopup="true"
        aria-expanded="false"
      >
        Actions
      </button>
      <div className="dropdown-menu" aria-labelledby={`dropdownMenu${productId}`}>
        <button className="dropdown-item" onClick={() => onRemove(productId)}>
          Remove
        </button>
        <button className="dropdown-item" onClick={() => onPurchase(productId)}>
          Purchase
        </button>
      </div>
    </div>
  );
};

export default PanelItemDropdown;
