import useAdmin from "../hooks/useAdmin";
import ModerationTable from "./ModerationTable";
import "./admin.css";

export default function AdminPanel() {
  const {
    messages,
    loading,
    removeMessage,
    removeRoom,
  } = useAdmin();

  return (
    <div className="admin-container">
      <h1>🛡 Admin Moderation Panel</h1>

      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <ModerationTable
          messages={messages}
          onDeleteMessage={removeMessage}
          onDeleteRoom={removeRoom}
        />
      )}
    </div>
  );
}