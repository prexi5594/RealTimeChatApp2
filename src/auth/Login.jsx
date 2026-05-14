import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      localStorage.setItem('quickchatLoggedIn', 'true');
      localStorage.setItem('quickchatUser', email);
      localStorage.setItem('username', email.split('@')[0]);
      alert(`Login successful! Welcome ${email}`);
      navigate('/chat');
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
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
            <Link to="/login" className="px-6 py-2 bg-white text-[#0052CC] rounded font-semibold hover:bg-gray-100 transition">Login</Link>
            <Link to="/signup" className="px-6 py-2 bg-white text-[#0052CC] rounded font-semibold hover:bg-gray-100 transition">Sign Up</Link>
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
            <h2 className="text-3xl font-bold text-[#0052CC] text-center mb-8">Login</h2>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-gray-900 font-semibold text-sm mb-3">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-semibold text-sm mb-3">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0052CC] hover:bg-[#003d99] text-white font-semibold py-3 rounded-lg transition duration-200 text-lg disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-700">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#0052CC] font-semibold hover:underline">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}