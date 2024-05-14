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
import Map from "./map";
const Women = () => {
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
  const [searchInput, setSearchInput] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const fetchProducts = () => {
  //   axios
  //     .get('http://localhost:5000/api/products')
  //     .then((response) => {
  //       setProducts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch products:", error); // Log the error
  //     });
  // };
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const category = "Women"; // Specify the category you want to fetch
  
        // Fetch products for the specified category
        const response = await axios.get(`http://localhost:5000/api/product?category=${category}`);
        console.log(`Fetched products for category "${category}":`, response.data);
  
        // Set the fetched products to state
        setProducts(response.data);
        const prices = response.data.map(product => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
  
    fetchProductsByCategory();
  }, []);
  
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchInput.toLowerCase()) &&
      product.price >= minPrice &&
      product.price <= maxPrice
    );
  });
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  

  const handleMaxPriceChange = (event) => {
    setMaxPrice(parseInt(event.target.value));
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
          <div className="navbar__brand">My Brand</div>
          <ul className="desktop-navbar">
            <li>
              <a className="a" href="/">
                Man
              </a>
            </li>
            <li>
              <a className="a" href="/Women">
                Women
              </a>
            </li>
          </ul>
          <div className="mobile-navbar">
            {/* Add your mobile navigation menu here */}
            <a className="a" href="/">
              Man
            </a>
            <a className="a" href="/Women">
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
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/summer-fashion-sale-flyer-design-template-e8e9c2228b0f09c6339cecf23fd2d0a2_screen.jpg?ts=1649930937"
              alt="Image 1"
              style={{ width: "100%", maxHeight: "70vh" }}
            />
          </div>
          <div>
            <img
              src="https://t4.ftcdn.net/jpg/01/86/24/71/360_F_186247102_7wpyEh7dYbMGRHGU3tvpVTOnjH0TwApu.jpg"
              alt="Image 2"
              style={{ width: "100%", maxHeight: "50vh" }}
            />
          </div>
          <div>
            <img
              src="https://businesstips.fr/wp-content/uploads/2019/01/banniere_box1-1024x512.png"
              alt="Image 3"
              style={{ width: "100%", maxHeight: "50vh" }}
            />
          </div>
        </Carousel>
        <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      
     
    <div className="price-range">
      <label>Filter by Price: </label>
      <input
        type="range"
        min={minPrice}
        max="9999"
        value={maxPrice}
        onChange={handleMaxPriceChange}
      />
      <span>{maxPrice} DT</span>
    </div>
  </div>

      </main>
      <div className="container mt-4">
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product._id} className="col-md-4 mb-4">
                <div className="card">
                <div
                  className="product-image"
                  onClick={() => openProductDetailModal(product)}
                >
                <img src={`data:image/png;base64,${product.image}`} alt={product.name} />

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
      </CartSidebar>
      <Map/>
    </div>
  );
};

export default Women;
