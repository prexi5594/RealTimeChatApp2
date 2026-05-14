import { Link } from "react-router-dom";

 function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Header */}
      <header className="bg-gradient-to-r from-[#0052CC] to-[#0052CC] text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-[#0052CC] font-bold text-lg">Q</span>
            </div>
            <span className="text-xl font-bold">Quickchat</span>
          </div>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-6 py-2 bg-white text-[#0052CC] rounded font-semibold hover:bg-gray-100 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-6 py-2 bg-white text-[#0052CC] rounded font-semibold hover:bg-gray-100 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0052CC] via-[#0052CC] to-[#00B85C] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to Quickchat
          </h1>
          <p className="text-lg text-gray-100">
            Fast, simple, and secure messaging for everyone
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-3 bg-white text-[#0052CC] font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Get Started
            </Link>

            <Link
              to="/signup"
              className="px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0052CC] transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">
          © 2026 Quickchat. All rights reserved.
        </p>
      </div>
    </div>
  );
}


export default Home;