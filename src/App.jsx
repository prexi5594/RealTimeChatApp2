import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ChatRooms from "./Pages/ChatPage"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/chat" element={<ChatRooms />} />
    </Routes>
  );
}

export default App;