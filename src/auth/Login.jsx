import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const handleLogin =
    async (e) => {

      e.preventDefault();

      if (
        !email.trim() ||
        !password.trim()
      ) {
        alert(
          "Please fill in all fields"
        );

        return;
      }

      setIsLoading(
        true
      );

      try {

        const res =
          await fetch(
            " http://172.28.42.45:5000/login",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  email,
                  password,
                }),
            }
          );

        const data =
          await res.json();

        console.log("LOGIN RESPONSE:", response.data);
        if (
          !res.ok
        ) {console.log("Login failed:", data);
          
          return;
        }

        /*
        SAVE TOKEN
        */

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        localStorage.setItem(
  "username",
  data.user.username || data.user.email.split("@")[0]
);

        localStorage.setItem(
          "email",
          data.user.email
        );

        alert(
          "Login successful"
        );

        /*
        ADMIN → DASHBOARD
        USER → CHAT
        */

        if (
          data.user.role ===
          "admin"
        ) {

          navigate(
            "/admin"
          );

        } else {

          navigate(
            "/chat"
          );

        }

      } catch (
        error
      ) {

        console.error(
          error
        );

        alert(
          "Cannot connect to backend"
        );

      } finally {

        setIsLoading(
          false
        );

      }
    };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <header className="bg-[#0052CC] text-white py-4 px-6">

        <div className="max-w-6xl mx-auto flex justify-between">

          <span className="font-bold text-xl">
            Quickchat
          </span>

          <div className="flex gap-4">

            <Link
              to="/login"
              className="bg-white text-[#0052CC] px-5 py-2 rounded"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-white text-[#0052CC] px-5 py-2 rounded"
            >
              Sign Up
            </Link>

          </div>

        </div>

      </header>

      <div className="flex-1 flex justify-center items-center">

        <div className="border-4 border-[#0052CC] rounded-2xl p-8 w-full max-w-md">

          <h2 className="text-3xl text-center mb-8">
            Login
          </h2>

          <form
            onSubmit={
              handleLogin
            }
            className="space-y-4"
          >

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
                isLoading
              }
              className="w-full bg-[#0052CC] text-white p-3 rounded"
            >
              {
                isLoading
                  ? "Logging in..."
                  : "Login"
              }
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}