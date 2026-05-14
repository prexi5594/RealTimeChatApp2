import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css";

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Registration successful!");

      localStorage.setItem("username", username);

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
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
            <Link to="/login" className="px-6 py-2 bg-white text-[#0052CC] rounded font-semibold hover:bg-gray-100 transition">
              Login
            </Link>
            <Link to="/signup" className="px-6 py-2 bg-white text-[#0052CC] rounded font-semibold hover:bg-gray-100 transition">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-[#0052CC] via-[#0052CC] to-[#00B85C] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Quickchat</h1>
          <p className="text-lg text-gray-100">Fast, simple, and secure messaging for everyone</p>
        </div>
      </div>

      <div className="flex-1 bg-white px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="border-4 border-[#0052CC] rounded-2xl p-8 bg-white">
            <h2 className="text-3xl font-bold text-[#0052CC] text-center mb-8">
              Create Your Account
            </h2>

            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block text-gray-900 font-semibold text-sm mb-3">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-semibold text-sm mb-3">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00B85C] hover:bg-[#009950] text-white font-semibold py-3 rounded-lg transition duration-200 text-lg"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-700">
                Already have an account?{" "}
                <Link to="/login" className="text-[#0052CC] font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}