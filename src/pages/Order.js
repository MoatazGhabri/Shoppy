import React, { useState, useEffect } from "react";
import axios from "axios";
import "./order.css"; // Import the CSS file
import Modal from "./Modal"; // Assuming you have a Modal component
import "./modal.css"

import 'react-responsive-carousel/lib/styles/carousel.min.css';
const OrdersPage = () => {
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    address: "",
    number: "",
    quantity: 1,
  });
  const [productId, setProductId] = useState(null); // Add the productId state

  useEffect(() => {
    fetchOrderedProducts();
  }, []);

  const fetchOrderedProducts = () => {
    axios
      .get(`http://localhost:5000/api/orders`)
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
          fetchOrderedProducts(); // Refresh the ordered products list
        })
        .catch((error) => {
          console.log(error);
        });
    
  };

  const handleConfirm = (productId) => {
    setShowModal(true);
    setProductId(productId); // Set the productId when the user confirms the order

    // Fetch product details based on productId and set them in the formData state
    // You can add additional code to fetch product details from the server and update the formData state.
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
    axios.post(`http://localhost:5000/api/orders/api/commande`, commentData)
      .then((response) => {
        console.log("Form data sent successfully:", response.data);
        handleRemove(productId); // Remove the product from the orders collection
        setShowModal(false);
      })
      .catch((error) => {
        console.log("Error sending form data:", error);
      });

  axios.post(`http://localhost:5000/api/orders/api/users`, Data)
      .then((response) => {
        console.log(" data sent successfully:", response.data);
       
      })
      .catch((error) => {
        console.log("Error sending  data:", error);
      });
  };
 

  return (
    
    <div className="orders-page">
    
      <ul className="orders-list">
        {orderedProducts.map((product) => (
          <li key={product._id} className="col-md-2 mb-2">
            <div className="order-card">
              <p>{product.productName}</p>
              <p>Price: {product.price} TND</p>
              <p>Quantity: {product.quantity}</p>
              <img src={product.image} alt={product.productName} />
              <div className="order-item-actions">
                <button className="remove" onClick={() => handleRemove(product._id)}>
                  Remove
                </button>
                <button className="confirm" onClick={() => handleConfirm(product._id)}>
                  Confirm
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

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

export default OrdersPage;
