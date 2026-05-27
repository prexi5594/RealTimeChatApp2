import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// 🟢 Import your working apiRequest tool directly instead!
import { apiRequest } from "../services/api"; 

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BASE = "/admin";

  // Fetch all user records from the Flask backend securely
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 🟢 Calling the apiRequest wrapper directly
        const res = await apiRequest(`${BASE}/users`, "GET");
        // Our fetch wrapper returns the raw parsed json array directly
        setUsers(res || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        toast.error("Failed to load user directory logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Moderate structural ban properties natively
  const handleToggleBan = async (user) => {
    try {
      if (user.role === "admin") {
        toast.error("Cannot restrict configuration access for root administrators.");
        return;
      }

      if (user.is_banned) {
        // 🟢 Use the apiRequest directly
        await apiRequest(`${BASE}/unban/${user.id}`, "POST");
        toast.success(`${user.username} has been reactivated.`);
        setUsers(users.map(u => u.id === user.id ? { ...u, is_banned: false } : u));
      } else {
        if (!window.confirm(`Are you sure you want to ban ${user.username}?`)) return;
        // 🟢 Use the apiRequest directly
        await apiRequest(`${BASE}/ban/${user.id}`, "POST");
        toast.success(`${user.username} has been suspended.`);
        setUsers(users.map(u => u.id === user.id ? { ...u, is_banned: true } : u));
      }
    } catch (err) {
      console.error("Moderation error:", err);
      toast.error("Failed to update user status profile restrictions.");
    }
  };

  // Wipes token storage clear and kicks session back to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    /* Full-screen solid white container to override parent backgrounds */
    <div className="w-full min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Area */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-gray-100 pb-4">
          <h1 className="text-3xl font-extrabold text-[#B91C1C] tracking-tight">
            Admin Dashboard
          </h1>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 border-2 border-black text-black hover:bg-black hover:text-white font-bold rounded-lg transition-all duration-200 shadow-sm text-sm uppercase tracking-wider"
          >
            Log Out
          </button>
        </div>

        {/* Main Table Container Card with a solid black top-border indicator */}
        <div className="bg-white rounded-xl shadow-xl p-6 border-t-4 border-l border-r border-b border-gray-200 border-t-black">
          
          <h2 className="text-xl font-black text-black mb-4 uppercase tracking-wide">
            Users
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300 text-gray-800 font-black text-xs uppercase tracking-widest bg-gray-50/50">
                  <th className="py-3 px-4 text-[#1E3A8A]">ID</th>
                  <th className="py-3 px-4 text-[#1E3A8A]">Username</th>
                  <th className="py-3 px-4 text-[#1E3A8A]">Email</th>
                  <th className="py-3 px-4 text-[#1E3A8A]">Role</th>
                  <th className="py-3 px-4 text-[#1E3A8A]">Online</th>
                  <th className="py-3 px-4 text-[#1E3A8A]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-500 font-bold animate-pulse">
                      Retrieving database logs...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-400 font-bold">
                      No active user accounts found in the database.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr 
                      key={user.id} 
                      className="border-b border-gray-200 hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-600 font-mono text-sm font-bold">
                        {user.id}
                      </td>
                      <td className="py-4 px-4 font-extrabold text-gray-900">
                        {user.username}
                      </td>
                      <td className="py-4 px-4 text-gray-700 font-semibold">
                        {user.email}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 text-xs rounded-full font-black uppercase tracking-wider border ${
                          user.role === "admin" 
                            ? "bg-red-50 text-red-700 border-red-300" 
                            : "bg-gray-100 text-gray-800 border-gray-300"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`w-2.5 h-2.5 inline-block rounded-full mr-2 ${
                          user.is_online 
                            ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" 
                            : "bg-gray-300"
                        }`} />
                        <span className={`font-bold text-sm ${
                          user.is_online ? "text-green-700" : "text-gray-400"
                        }`}>
                          {user.is_online ? "Online" : "Offline"}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleBan(user)}
                          className={`px-3 py-1.5 text-xs font-black rounded-lg uppercase tracking-wider border transition-all duration-150 ${
                            user.is_banned
                              ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-600 hover:text-white"
                              : "bg-red-50 text-red-700 border-red-200 hover:bg-red-600 hover:text-white"
                          }`}
                        >
                          {user.is_banned ? "Unban Account" : "Ban User"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;