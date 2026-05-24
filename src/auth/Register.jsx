import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const validateEmail = (
    email
  ) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);
  };

  const handleRegister =
    async (e) => {
      e.preventDefault();

      if (
        !email ||
        !username ||
        !password
      ) {
        alert(
          "Please fill in all fields"
        );
        return;
      }

      if (
        !validateEmail(
          email
        )
      ) {
        alert(
          "Enter a valid email address"
        );
        return;
      }

      setLoading(true);

      try {
        const res =
          await fetch(
            "https://realtimechatappbackend-zhb5.onrender.com/register",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
                    email,
                    username,
                    password,
                  }
                ),
            }
          );

        const data =
          await res.json();

        if (
          !res.ok
        ) {
          alert(
            data.error ||
              "Registration failed"
          );

          return;
        }

        alert(
          "Registration successful!"
        );

        localStorage.setItem(
          "username",
          username
        );

        navigate(
          "/login"
        );
      } catch (
        error
      ) {
        console.error(
          error
        );

        alert(
          "Server error"
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <header className="bg-[#0052CC] text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between">

          <h1 className="text-2xl font-bold">
            Quickchat
          </h1>

          <Link
            to="/login"
            className="bg-white text-[#0052CC] px-4 py-2 rounded"
          >
            Login
          </Link>

        </div>
      </header>

      <div className="flex-1 flex justify-center items-center">

        <div className="w-full max-w-md border p-8 rounded-xl">

          <h2 className="text-3xl text-center font-bold mb-6">
            Sign Up
          </h2>

          <form
            onSubmit={
              handleRegister
            }
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded"
            />

            <button
              type="submit"
              disabled={
                loading
              }
              className="w-full bg-green-600 text-white p-3 rounded"
            >
              {loading
                ? "Registering..."
                : "Sign Up"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}