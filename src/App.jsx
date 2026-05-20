import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ChatRooms from "./Pages/ChatPage"; 
import ForgotPassword from "./auth/Forgotpassword";
import ResetPassword from "./auth/Resetpassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/chat" element={<ChatRooms />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;