import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ChatPage from "./Pages/ChatRooms"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
  );
}

export default App;