import { Link } from 'react-router-dom';

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
      <div className="bg-gradient-to-r from-[#0052CC] via-[#0052CC] to-[#00B85C] text-white py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Quickchat</h1>
          <p className="text-lg md:text-2xl text-gray-100 mb-8">Fast, simple, and secure messaging for everyone</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="px-8 py-3 bg-white text-[#0052CC] rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
            >
              Get Started
            </Link>
            <Link 
              to="/signup" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#0052CC] transition inline-block"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Why Choose Quickchat?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Experience real-time messaging with minimal latency</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure</h3>
              <p className="text-gray-600">Your messages are encrypted end-to-end</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Simple to Use</h3>
              <p className="text-gray-600">Intuitive interface that anyone can use</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#0052CC] to-[#00B85C] text-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to chat?</h2>
          <p className="text-lg mb-8">Join thousands of users who trust Quickchat for their messaging needs</p>
          <Link 
            to="/signup" 
            className="px-8 py-3 bg-white text-[#0052CC] rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Sign Up Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2026 Quickchat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;