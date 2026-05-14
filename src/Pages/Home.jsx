import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 flex flex-col">
      <header className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">Q</span>
            </div>
            <span className="text-2xl font-bold text-white">Quickchat</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Connect with Others in Real-Time
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12">
            Fast, simple, and secure messaging for everyone. Chat instantly with friends and colleagues.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/chat" className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition transform hover:scale-105 text-lg">
              Start Chatting
            </Link>
            <Link to="/login" className="px-10 py-4 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900 transition transform hover:scale-105 text-lg border-2 border-white">
              Login
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl border border-white border-opacity-20">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-blue-100">Real-time messaging with instant delivery</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl border border-white border-opacity-20">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-white mb-2">Secure</h3>
              <p className="text-blue-100">Your conversations are private and protected</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl border border-white border-opacity-20">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-white mb-2">Simple to Use</h3>
              <p className="text-blue-100">Clean, intuitive interface for everyone</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="px-6 py-8 text-center text-blue-100 text-sm">
        <p>&copy; 2026 Quickchat. All rights reserved.</p>
      </footer>
    </div>
  );
}