export default function ModerationTable({
  messages,
  onDeleteMessage,
  onDeleteRoom,
}) {
  return (
    <div style={{ marginTop: 20 }}>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Message</th>
            <th>User</th>
            <th>Room</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id}>
              <td>{msg.id}</td>
              <td>{msg.content}</td>
              <td>{msg.user_id}</td>
              <td>{msg.room_id}</td>

              <td>
                <button onClick={() => onDeleteMessage(msg.id)}>
                  Delete Msg
                </button>

                <button onClick={() => onDeleteRoom(msg.room_id)}>
                  Delete Room
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}