export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">

      <div className="bg-white p-4 rounded shadow">
        <h2>Total Users</h2>
        <p className="text-2xl font-bold">{stats.total_users}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2>Online Users</h2>
        <p className="text-2xl font-bold">{stats.online_users}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2>Banned Users</h2>
        <p className="text-2xl font-bold">{stats.banned_users}</p>
      </div>

    </div>
  );
}