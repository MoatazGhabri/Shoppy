import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CartSidebar.css"; // Import the CSS file
import Modal from "./Modal";
import "./order.css";
import "./modal.css";
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique identifiers

import jwt_decode from 'jwt-decode';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe from Stripe SDK
const stripePromise = new loadStripe('pk_test_51OcUWuDKj1JsPJWQB2HJMVyBbc2VDdXVkGrbFu70Yw6qeFnKSI722B8ZhzvZNBqJMRQYWOnp69NYL14N226MDsPy00kLrUDwuE');

const CartSidebar = ({ isOpen, onClose }) => {
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
  
  useEffect(() => {
    const userId = localStorage.getItem('userId') || uuidv4();
    localStorage.setItem('userId', userId);
    fetchOrderedProducts(userId);
  
    const userName = localStorage.getItem('userName');
    const userLastName = localStorage.getItem('userLastName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userName && userLastName && userEmail) {
      setFormData({
        ...formData,
        name: userName,
        lastName: userLastName,
        email: userEmail,
      });
    }
  }, []);



  const fetchOrderedProducts = (userId) => {
    axios
      .get(`http://localhost:5000/api/orders?userId=${userId}`)
      .then((response) => {
        setOrderedProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemove = (productId) => {
    axios
      .delete(`http://localhost:5000/api/orders/${productId}`)
      .then(() => {
        setOrderedProducts(prevProducts => prevProducts.filter(product => product._id !== productId));


      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirm = (productId) => {
    const token = localStorage.getItem('token');
    if (token) {
      setShowModal(true);
      setProductId(productId);
    } else {
      // User is not logged in
      toast.error("You need to be logged in to confirm order.", {
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
  
  const handleSubmit = async (e) => {
    const stripe = await stripePromise; // Wait for Stripe to be loaded

    e.preventDefault();
  
    const commandeData = {
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      number: formData.number,
      quantity: formData.quantity,
      productName: orderedProducts.find(product => product._id === productId).productName,
      image: orderedProducts.find(product => product._id === productId).image,
      price: orderedProducts.find(product => product._id === productId).price * formData.quantity,
      category: orderedProducts.find(product => product._id === productId).category,
    };
    
    axios.post("http://localhost:5000/api/commande", commandeData)
    .then((response) => {
      console.log("Form data sent successfully:", response.data);
      handleRemove(productId); 
      setShowModal(false);
      const sessionId = response.data.sessionId;
      // Redirect user to Stripe Checkout page
      stripe.redirectToCheckout({ sessionId });
    })
    .catch((error) => {
      console.log("Error sending form data:", error);
      // Display toast notification for specific errors
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // Generic error message
        toast.error("Your quantity is greater than our stock or product is out of stock.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
};
const totalPrice = orderedProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0);

  return (
    <div className={`user-login-sidebar ${isOpen ? "open" : ""}`}>
      <div className="cart-content">
        <h2>Panel</h2>
        <div className="added-products" style={{ maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}>
          {Object.values(orderedProducts).map((product) => (
            <div key={product._id} className="added-product">
              <div className="product-info">
                <img src={`data:image/png;base64,${product.image}`} alt={product.name} />
                <div className="product-details">
                  <h3>{product.productName}</h3>
                  <p>
                    Quantity: {product.quantity}
                  </p>
                  <p>Total: {product.price}TND</p>
                </div>
                <div className="product-buttons">
                  <button className="btn btn-danger" onClick={() => handleRemove(product._id)}>remove</button>
                  <button className="btn btn-success" onClick={() => handleConfirm(product._id)}>Confirm</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="total-price">Total Price: {totalPrice}TND</div>
        <button className="close-button" onClick={onClose}>X</button>
        
      </div>
      {showModal && (
        <Modal onClose={handleModalClose}>
          <h3>Confirmation Form</h3>
          <form onSubmit={handleSubmit} className="modal-body">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleFormChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleFormChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleFormChange} />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleFormChange} />
            <input type="number" name="number" placeholder="Number" value={formData.number} onChange={handleFormChange} pattern="[0-9]{8}" title="Please enter 8 digits"/>
            <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleFormChange} />
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleModalClose}>Cancel</button>
              <button type="submit" className="btn btn-success">Checkout</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CartSidebar;
