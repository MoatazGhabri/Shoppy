import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductDetailModal = ({ product, onAddToPanel, onCancel }) => {
  const [quantity, setQuantity] = useState(1); // Initialize quantity with 1

  const addToPanel = () => {
    
    // Send a request to the backend API to add the product to the "orders" collection
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/orders`, {
        productName: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,

      })
      .then((response) => {
        toast.success("Product added successful to the panel!", {
          position: "top-right",
          autoClose: 3000, // Notification will close after 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // Successfully added to orders collection, you can update the UI accordingly or show a success message
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors that occurred during the API request
      });

    // Close the modal after adding to panel
    onCancel();
  };
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
          <p>Price: {product.price} TND</p>
          <p>Quantity: {product.quantity}</p>
          <img
            src={product.image}
            alt={product.name}
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-danger" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="btn btn-success" onClick={addToPanel}>
          Add to Panel
        </button>
      </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
