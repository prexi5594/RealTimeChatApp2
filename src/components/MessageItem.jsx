export default function MessageItem({ message }) {
  return (
    <div className="message">
      <strong>{message.user}</strong>
      <p>{message.text}</p>
    </div>
  );
}