import { useState } from "react";
import "./auth.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      setUsername("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">

      <div className="register-left">

        <h1>RealTime Chat</h1>

        <p>
          Connect instantly with friends and teams
          in real-time conversations.
        </p>

      </div>

      <div className="register-right">

        <form
          className="register-form"
          onSubmit={handleRegister}
        >

          <h2>Create Account</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Sign Up
          </button>

          <p className="login-link">
            Already have an account?
            <span> Login</span>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;