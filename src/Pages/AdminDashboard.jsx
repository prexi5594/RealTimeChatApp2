import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StatsCards from "../components/StatsCards";
import UsersTable from "../components/UsersTable";
import AnalyticsChart from "../components/AnalyticsChart";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // ======================
  // AUTH CHECK (ADMIN ONLY)
  // ======================
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/chat");
    }
  }, [navigate, user]);

  // ======================
  // STATE
  // ======================
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes, analyticsRes] = await Promise.all([
        fetch("https://realtimechatappbackend-zhb5.onrender.com/admin/stats", {
          headers,
        }),
        fetch("https://realtimechatappbackend-zhb5.onrender.com/admin/users", {
          headers,
        }),
        fetch("https://realtimechatappbackend-zhb5.onrender.com/admin/analytics/users", {
          headers,
        }),
      ]);

      const statsData = await statsRes.json();
      const usersData = await usersRes.json();
      const analyticsData = await analyticsRes.json();

      setStats(statsData);
      setUsers(usersData);
      setAnalytics(analyticsData);

    } catch (err) {
      console.log(err);
    }
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {stats && <StatsCards stats={stats} />}

      {analytics && <AnalyticsChart analytics={analytics} />}

      <UsersTable users={users} />

    </div>
  );
}