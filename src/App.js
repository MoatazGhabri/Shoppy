import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import FileManager from "./pages/FileManager";
import Analytics from "./pages/Analytics";
import OrdersPage from "./pages/Order";
import Saved from "./pages/Saved";
import Setting from "./pages/Setting";
import Ap from "./pages/ap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          

          <Route path="*" element={<> not found</>} />
        </Routes>
        <ToastContainer /> 
    </Router>
    
  );
}

export default App;