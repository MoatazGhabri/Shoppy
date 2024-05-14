import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
const ProductDetailModal = ({ product, onAddToPanel, onCancel }) => {
  const [quantity, setQuantity] = useState(1); 

  const addToPanel = () => {
    const userId = localStorage.getItem('userId') || generateUUID();
    localStorage.setItem('userId', userId);
    axios
      .post(`http://localhost:5000/api/orders`, {
        userId,
        productName: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
        category:product.category,

      })
      
      .then((response) => {
        toast.success("Product added successful to the panel!", {
          position: "top-right",
          autoClose: 3000, 
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });      window.location.reload(); // Reload the page

      })
      .catch((error) => {
        console.log(error);
      });

    onCancel();
  };
  return (
    <div className="modal-wrapper">
      <div className="modal-background" onClick={onCancel}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{product.name}</h5>

          <button className="close-button" onClick={onCancel}>X</button>
           
        </div>
        <div className="modal-body">
          <img src={`data:image/png;base64,${product.image}`} alt={product.name} style={{ maxWidth: "70%", maxHeight: "70%",alignItems:"center" }}/>
         
           <p>Price: {product.price} TND</p>

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
