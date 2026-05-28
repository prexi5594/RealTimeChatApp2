import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email.trim() || !password.trim()) {
    toast.error("Please fill in all fields");
    return;
  }

  setIsLoading(true);
  // Track the ID of our loading container
  const loadingToastId = toast.loading("Logging in...");

  try {
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Clear the loading spinner right away since we hit an error wall
      toast.dismiss(loadingToastId);

      if (res.status === 403 && data.needs_verification) {
        toast.error("Please verify your email first");
        navigate("/signup");
        return;
      }

      toast.error(data.error || "Login failed");
      return;
    }

    /* 1. SAVE USER METADATA FIRST (Crucial order fix) */
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("username", data.user?.username);
    localStorage.setItem("email", data.user?.email);
    /* 2. KILL SPINNER AND SHOW SUCCESS TOAST */
    toast.dismiss(loadingToastId);
    toast.success("Login successful!");

    /* 3. THEN NAVIGATE */
    if (data.user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/chat");
    }

  } catch (error) {
    // Kill spinner if the backend server is offline or drops connection
    toast.dismiss(loadingToastId);
    console.error("Connection error details:", error);
    toast.error("Cannot connect to backend");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-[#0052CC] text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between">
          <span className="font-bold text-xl">Quickchat</span>
          <div className="flex gap-4">
            <Link to="/login" className="bg-white text-[#0052CC] px-5 py-2 rounded">Login</Link>
            <Link to="/signup" className="bg-white text-[#0052CC] px-5 py-2 rounded">Sign Up</Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex justify-center items-center">
        <div className="border-4 border-[#0052CC] rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl text-center mb-8">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0052CC] text-white p-3 rounded"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
