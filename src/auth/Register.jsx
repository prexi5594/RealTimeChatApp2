import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function SignUp() {
  const navigate = useNavigate();

  const [step, setStep] = useState("register");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // =========================
  // REGISTER USER
  // =========================
const handleRegister = async (e) => {
  e.preventDefault();

  if (!email || !username || !password) {
    toast.error("Please fill in all fields");
    return;
  }

  if (!validateEmail(email)) {
    toast.error("Enter a valid email address");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(
      "https://realtimechatappbackend-y8z2.onrender.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      }
    );

    const data = await res.json();

    // USER ALREADY EXISTS
    if (res.status === 409) {
      toast.error("Account already exists. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return;
    }

    // OTHER ERRORS
    if (!res.ok) {
      toast.error(data.error || "Registration failed");
      return;
    }

    // SUCCESS
    toast.success("OTP sent to email");
    setStep("otp");

  } catch (error) {
    console.error(error);
    toast.error("Server error");
  } finally {
    setLoading(false);
  }
};

  // =========================
  // VERIFY OTP
  // =========================
  const handleVerifyOtp = async (e) => {
  e.preventDefault();
  localStorage.setItem("token", data.token);
navigate("/chat");

  if (!otp) {
    toast.error("Enter OTP code");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(
      "https://realtimechatappbackend-y8z2.onrender.com/verify-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: otp,
        }),
      }
    );

    // HANDLE NON-JSON SERVER ERRORS
    let data;

    try {
      data = await res.json();
    } catch {
      throw new Error("Server returned invalid response");
    }

    // INVALID OTP / OTHER ERRORS
    if (!res.ok) {
      toast.error(data.error || "Invalid OTP");
      return;
    }

    // SUCCESS
    toast.success("Account verified successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 1500);

  } catch (err) {
    console.error(err);

    toast.error(
      err.message || "Server error"
    );

  } finally {
    setLoading(false);
  }
};

  // =========================
  // RESEND OTP
  // =========================
  const handleResendOtp = async () => {

  if (!email) {
    toast.error("Email is required");
    return;
  }

  try {

    const res = await fetch(
      "https://realtimechatappbackend-y8z2.onrender.com/resend-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    let data = {};

    try {
      data = await res.json();
    } catch (e) {
      data = {
        error: "Invalid server response"
      };
    }

    if (!res.ok) {
      toast.error(
        data.error || "Failed to resend OTP"
      );
      return;
    }

    toast.success("OTP resent successfully!");

  } catch (error) {

    console.error(
      "FETCH FAILED:",
      error
    );

    toast.error(
      "Backend not reachable (CORS or server issue)"
    );
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