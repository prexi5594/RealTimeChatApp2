import MessageItem from "./MessageItem";

export default function MessageList({ messages }) {
  return (
    <div style={styles.list}>
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
}

const styles = {
  list: {
    flex: 1,
    overflowY: "auto",
    padding: "10px"
  }
};