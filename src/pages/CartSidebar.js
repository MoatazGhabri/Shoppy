import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CartSidebar.css"
import Modal from "./Modal";
import "./order.css"; // Import the CSS file
import "./modal.css"
import jwt_decode from 'jwt-decode';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CartSidebar = ({ isOpen }) => {
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState(null); // Add the productId state
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    address: "",
    number: "",
    quantity: 1,
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOrderedProducts();
  }, []);

  const fetchOrderedProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders`)
      .then((response) => {
        setOrderedProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRemove = (productId) => {
   
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/orders/${productId}`)
      .then(() => {
        fetchOrderedProducts(); // Refresh the ordered products list
      })
      .catch((error) => {
        console.log(error);
      });
  
};
const handleConfirm = (productId) => {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage
  
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken && decodedToken.userId) {
        setShowModal(true);
        setProductId(productId);
        // ... rest of the code
      } else {
        // User is not logged in
        toast.error("You need to be logged in to confirm command.", {
            position: "top-right",
            autoClose: 3000, // Notification will close after 3 seconds
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
      }
    } else {
        toast.error("You need to be logged in to confirm command.", {
            position: "top-right",
            autoClose: 3000, // Notification will close after 3 seconds
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const commentData = {
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      number: formData.number,
      quantity: formData.quantity,
      productName: orderedProducts.find(product => product._id === productId).productName,
      image: orderedProducts.find(product => product._id === productId).image,
      price: orderedProducts.find(product => product._id === productId).price * formData.quantity,
    };
    const Data = {
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      number: formData.number,
    };
    
    

    axios.post("http://localhost:5001/api/comments", commentData)
      .then((response) => {
        console.log("Form data sent successfully:", response.data);
        
        handleRemove(productId); // Remove the product from the orders collection
        setShowModal(false);
      })
      .catch((error) => {
        console.log("Error sending form data:", error);
      });

 
  };
 

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
    <div className="cart-content">
      <h2>Panel</h2>
      <div className="added-products">
        {Object.values(orderedProducts).map((product) => (
          <div key={product._id} className="added-product">
            <div className="product-info">
              <img src={product.image} alt={product.productName} />
              <div className="product-details">
                <h3>{product.productName}</h3>
                <p>Quantity: {product.quantity}</p>
                <p>Total Price: {product.price} TND</p>
              </div>
            </div>
            <div className="product-buttons">
              <button
                className="btn btn-danger"
                onClick={() => handleRemove(product._id)}
              >
                Remove
              </button>
              <button
                className="btn btn-success"
                onClick={() => handleConfirm(product._id)}
              >
                Confirm
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  

         
      {showModal && (
        <Modal onClose={handleModalClose}>
          <h3>Confirmation Form</h3>
          <form onSubmit={handleSubmit} className="modal-body">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleFormChange} />
            <input type="text" name="lastName" placeholder="lastName" value={formData.lastName} onChange={handleFormChange} />
            <input type="email" name="email" placeholder="email" value={formData.email} onChange={handleFormChange} />
            <input type="text" name="address" placeholder="address" value={formData.address} onChange={handleFormChange} />

            <input type="number" name="number" placeholder="number" value={formData.number} onChange={handleFormChange} />
            <input type="number" name="quantity" placeholder="quantity" value={formData.quantity} onChange={handleFormChange} />
<div className="modal-footer">
<button type="button" className="btn btn-danger" onClick={handleModalClose}>
          Cancel
        </button>

        <button type="submit" className="btn btn-success" >OK</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CartSidebar;
