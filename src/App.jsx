import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ChatRooms from "./Pages/ChatPage";
import AdminDashboard from "./Pages/AdminDashboard";

function App() {
  return (
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
  );
}

export default App;