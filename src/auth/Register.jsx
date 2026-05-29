import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";


export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(location.state?.step || "register");

  const [email, setEmail] = useState(location.state?.email || "");
  const [username, setUsername] = useState(location.state?.username || "");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.info(location.state.toastMessage);
    }
  }, [location.state]);

  // =========================
  // REGISTER USER
  // =========================
const handleRegister = async (e) => {
  e.preventDefault();

  if (!email || !username || !password) {
    toast.error("All fields required");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(
      "https://realtimechatappbackend-y8z2.onrender.com/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      toast.error(data.error || "Registration failed");
      return;
    }

    toast.success(data.message || "OTP sent to email");

    // go to OTP screen
    setStep("otp");
    setOtpEmail(email);

  } catch (err) {
    console.error(err);
    toast.error("Server error");
  } finally {
    setLoading(false);
  }
};


  // =========================
  // VERIFY OTP
  // =========================
const handleRegister = async (e) => {
  e.preventDefault();

  if (!email || !username || !password) {
    toast.error("All fields required");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(
      "https://realtimechatappbackend-y8z2.onrender.com/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      toast.error(data.error || "Registration failed");
      return;
    }

    toast.success(data.message || "OTP sent to email");

    // go to OTP screen
    setStep("otp");
    setOtpEmail(email);

  } catch (err) {
    console.error(err);
    toast.error("Server error");
  } finally {
    setLoading(false);
  }
};

  // =========================
  // RESEND OTP
  // =========================
const handleVerifyOtp = async (e) => {
  e.preventDefault();

  if (!otp) {
    toast.error("Enter OTP");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(
      "https://realtimechatappbackend-y8z2.onrender.com/verify-otp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,   // ✅ IMPORTANT FIX
        }),
      }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      toast.error(data.error || "Invalid OTP");
      return;
    }

    toast.success("Account verified!");

    // save auth
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("username", data.user?.username);
    localStorage.setItem("email", data.user?.email);

    // redirect
    setTimeout(() => {
      navigate(data.user.role === "admin" ? "/admin" : "/chat");
    }, 1000);

  } catch (err) {
    console.error(err);
    toast.error("Server error");
  } finally {
    setLoading(false);
  }
};
//HANDLER FOR RESENDING OTP
const handleResendOtp = async () => {
  if (!email) {
    toast.error("Email required");
    return;
  }

  try {
    const res = await fetch(
      "https://realtimechatappbackend-y8z2.onrender.com/resend-otp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      toast.error(data.error || "Failed to resend OTP");
      return;
    }

    toast.success("OTP resent successfully!");

  } catch (err) {
    console.error(err);
    toast.error("Server not reachable");
  }
};
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* HEADER */}
      <header className="bg-[#0052CC] text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between">
          <h1 className="text-2xl font-bold">Quickchat</h1>
          <Link
            to="/login"
            className="bg-white text-[#0052CC] px-4 py-2 rounded"
          >
            Login
          </Link>
        </div>
      </header>

      {/* BODY */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-md border p-8 rounded-xl">

          <h2 className="text-3xl text-center font-bold mb-6">
            {step === "register" ? "Sign Up" : "Verify OTP"}
          </h2>

          {/* REGISTER FORM */}
          {step === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border p-3 rounded"
              />

              <input
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
                disabled={loading}
                className="w-full bg-green-600 text-white p-3 rounded"
              >
                {loading ? "Registering..." : "Sign Up"}
              </button>
            </form>
          )}

          {/* OTP FORM */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-center text-gray-600">
                Enter OTP sent to {email}
              </p>

              <input
                placeholder="OTP Code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border p-3 rounded"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white p-3 rounded"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {/* RESEND BUTTON */}
          {step === "otp" && (
            <button
              type="button"
              onClick={handleResendOtp}
              className="w-full bg-gray-500 text-white p-3 rounded mt-4"
            >
              Resend OTP
            </button>
          )}

        </div>
      </div>
    </div>
  );
}