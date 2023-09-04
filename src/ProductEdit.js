// ProductEdit.js (frontend)

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        const productData = response.data;
        setName(productData.name);
        setPrice(productData.price);
        setQuantity(productData.quantity);
        setImage(productData.image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = { name, price, quantity, image };
    axios
      .put(`http://localhost:5000/api/products/${id}`, updatedProduct)
      .then((response) => {
        alert("Product updated successfully.");
        navigate("/"); // Use navigate instead of history.push
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Edit Product</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Save
            </button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
