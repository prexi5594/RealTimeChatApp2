export default function MessageItem({ message }) {
  return (
    <div style={styles.message}>
      <strong>{message.user}:</strong> {message.text}
    </div>
  );
}

const styles = {
  message: {
    padding: "6px",
    marginBottom: "5px",
    background: "#f5f5f5",
    borderRadius: "6px"
  }
};