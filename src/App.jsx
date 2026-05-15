import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
=======

>>>>>>> 83cd97ecf34d7175d7eb25bd75c2b27de06e99b5
import Home from "./Pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
<<<<<<< HEAD
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/register" element={<Register />} />
=======
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
>>>>>>> 83cd97ecf34d7175d7eb25bd75c2b27de06e99b5
    </Routes>
  );
}

export default App;
