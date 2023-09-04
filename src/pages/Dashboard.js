import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ProductDetailModal from "./ProductDetailModal";
import logo192 from "./logo192.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsCartCheck } from "react-icons/bs";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import UserRegistrationSidebar from "./SignupForm";
import UserLoginSidebar from "./signUp";
import CartSidebar from "./CartSidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [panelProducts, setPanelProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginSidebarOpen, setIsLoginSidebarOpen] = useState(false);
  const [isRegistrationSidebarOpen, setIsRegistrationSidebarOpen] = useState(
    false
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isScrolled, setIsScrolled] = useState(false);
  const [logo, setLogo] = useState(logo192);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openProductDetailModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetailModal = () => {
    setSelectedProduct(null);
  };

  const addToPanel = (product) => {
    setPanelProducts([...panelProducts, product]);
    setSelectedProduct(null);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLoginSidebarToggle = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    } else {
      setIsLoginSidebarOpen(!isLoginSidebarOpen);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.info("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleRegistrationSidebarToggle = () => {
    setIsRegistrationSidebarOpen(!isRegistrationSidebarOpen);
  };

  const handleShowRegistrationSidebar = () => {
    setIsLoggedIn(false);
    setIsLoginSidebarOpen(false);
    setIsRegistrationSidebarOpen(true);
  };

  const handleLoginSidebar = () => {
    setIsLoginSidebarOpen(true);
    setIsRegistrationSidebarOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
        setLogo(logo192);
      } else {
        setIsScrolled(false);
        setLogo(logo192);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="user-page">
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <nav className="navbar">
          <div className="navbar__brand">Shoppy</div>
          <ul className="desktop-navbar">
            <li>
              <a className="a" href="#man">
                Man
              </a>
            </li>
            <li>
              <a className="a" href="#women">
                Women
              </a>
            </li>
          </ul>
          <div className="mobile-navbar">
            {/* Add your mobile navigation menu here */}
            <a className="a" href="#man">
              Man
            </a>
            <a className="a" href="#women">
              Women
            </a>
          </div>
          <div className="navbar__button">
            <a className="bs" onClick={handleSidebarToggle}>
              <BsCartCheck />
            </a>
            {isLoggedIn ? (
              <a className="fa" onClick={handleLogout}>
                <FaSignOutAlt />
              </a>
            ) : (
              <a className="fa" onClick={handleLoginSidebarToggle}>
                <FaUser />
              </a>
            )}
          </div>
        </nav>
      </header>
      <UserLoginSidebar
        isOpen={isLoginSidebarOpen}
        onClose={handleLoginSidebarToggle}
        onShowRegistration={handleShowRegistrationSidebar}
        setIsLoggedIn={setIsLoggedIn}
      />

      <UserRegistrationSidebar
        isOpen={isRegistrationSidebarOpen}
        onClose={handleRegistrationSidebarToggle}
        onShow={handleLoginSidebar}
      />

      <main>
        <Carousel showThumbs={true} infiniteLoop={true} autoPlay={true}>
          <div>
            <img
              src="post.png"
              alt="Image 1"
              style={{ width: "100%", maxHeight: "50vh" }}
            />
          </div>
          <div>
            <img
              src="logo.png"
              alt="Image 2"
              style={{ width: "100%", maxHeight: "30vh" }}
            />
          </div>
          <div>
            <img
              src="https://www.bons-plans-malins.com/wp-content/uploads/2021/06/Lancement-des-soldes-Bershka.jpg"
              alt="Image 3"
              style={{ width: "100%", maxHeight: "50vh" }}
            />
          </div>
        </Carousel>
      </main>
      <div className="container mt-4">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card">
                <div
                  className="product-image"
                  onClick={() => openProductDetailModal(product)}
                >
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price} DT</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onAddToPanel={addToPanel}
          onCancel={closeProductDetailModal}
        />
      )}
      <CartSidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarToggle}
        addedProducts={panelProducts}
      >
        {/* ... other cart content */}
      </CartSidebar>
    </div>
  );
};

export default Dashboard;
