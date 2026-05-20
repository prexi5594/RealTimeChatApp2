import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("reset_token");

    try {
      await axios.post(
        "http://localhost:5000/reset-password",
        {
          new_password: password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Password reset successful");

      localStorage.removeItem("reset_token");

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Reset failed");
    }
  };

  return (
    <form onSubmit={handleReset}>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Reset Password</button>
    </form>
  );
}