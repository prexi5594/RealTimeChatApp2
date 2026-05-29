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

  if (!email || !password) {
    toast.error("Fill all fields");
    return;
  }

  setIsLoading(true);

  const toastId = toast.loading("Logging in...");

  try {
    const res = await fetch("https://realtimechatappbackend-y8z2.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      toast.dismiss(toastId);

      // ❌ NOT VERIFIED CASE
      if (res.status === 403) {
        toast.error(data.error || "Account not verified");

        // optional resend OTP
        await fetch("https://realtimechatappbackend-y8z2.onrender.com/resend-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        toast.info("OTP resent. Please verify your account.");
        return;
      }

      toast.error(data.error || "Login failed");
      return;
    }

    // SUCCESS
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    toast.dismiss(toastId);
    toast.success("Login successful");

    if (data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/chat");
    }

  } catch (err) {
    toast.dismiss(toastId);
    console.error(err);
    toast.error("Server unreachable");
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
