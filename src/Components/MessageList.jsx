import MessageItem from "./MessageItem";

export default function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
}