export default function UsersTable({ users }) {
  return (
    <div className="bg-white p-4 rounded shadow">

      <h2 className="text-xl font-bold mb-4">
        Users
      </h2>

      <table className="w-full">

        <thead>
          <tr className="border-b">
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Online</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center border-b">

              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.is_online ? "🟢" : "⚪"}
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}