import React from "react";
import CustomDropdown from "./PanelItemDropdown";
import "./App.css";
const ProductDetailModal = ({ product, onAddToPanel, onCancel }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-background" onClick={onCancel}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{product.name}</h5>
          <button type="button" className="close" onClick={onCancel}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <img
            src={product.image}
            alt={product.name}
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={() => onAddToPanel(product)}>
            Add to Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
