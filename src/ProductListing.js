// ProductListing.js (frontend)

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductListing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to remove this product?")) {
      axios.delete(`http://localhost:5000/api/products/${id}`)
        .then(() => {
          alert("Product removed successfully.");
          fetchProducts();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Product Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="/product/create" className="btn btn-success">Add New (+)</Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Image</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <img src={product.image} alt={product.name} style={{ maxWidth: "100px", maxHeight: "100px" }} />
                  </td>
                  <td>
                    <Link to={`/product/edit/${product._id}`} className="btn btn-success">Edit</Link>
                    <button onClick={() => removeProduct(product._id)} className="btn btn-danger">Remove</button>
                    <Link to={`/product/${product._id}`} className="btn btn-primary">Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
