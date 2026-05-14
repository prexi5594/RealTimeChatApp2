export default function MessageItem({ message }) {
  const isBot = message.user?.toLowerCase().includes("bot");
  const className = isBot ? "message message-bot" : "message message-user";

  return (
    <div className={className}>
      <div className="message-meta">
        <span>{message.user}</span>
      </div>
      <div className="message-text">{message.text}</div>
    </div>
  );
}