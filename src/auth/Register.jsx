import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await res.json();
      console.log("SERVER RESPONSE:", data);

      if (!res.ok) {
        alert(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      alert("Registration successful!");

      localStorage.setItem("username", username);

      navigate("/login");
    } catch (error) {
      console.error("ERROR:", error);
      alert("Server error. Make sure backend is running.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-gradient-to-r from-[#0052CC] to-[#0052CC] text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-[#0052CC] font-bold text-lg">Q</span>
            </div>
            <span className="text-xl font-bold">Quickchat</span>
          </div>

          <div className="flex gap-4">
            <Link to="/login" className="px-6 py-2 bg-white text-[#0052CC] rounded font-semibold">
              Login
            </Link>
            <Link to="/signup" className="px-6 py-2 bg-white text-[#0052CC] rounded font-semibold">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-[#0052CC] via-[#0052CC] to-[#00B85C] text-white py-16 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Quickchat</h1>
        <p className="text-lg text-gray-100">
          Fast, simple, and secure messaging for everyone
        </p>
      </div>

      <div className="flex-1 bg-white px-6 py-12">
        <div className="max-w-md mx-auto border-4 border-[#0052CC] rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-[#0052CC] text-center mb-8">
            Create Your Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00B85C] text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0052CC] font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}