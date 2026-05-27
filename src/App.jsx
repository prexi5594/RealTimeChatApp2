import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ChatRooms from "./Pages/ChatPage";
import AdminDashboard from "./Pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* Chat */}
        <Route path="/chat" element={<ChatRooms />} />

        {/* ADMIN ROUTE */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* FIXED: ToastContainer is now safely outside of the Routes block */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light" 
      />
    </>
  );
}

export default App;