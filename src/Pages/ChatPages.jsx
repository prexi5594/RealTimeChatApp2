import ChatBox from "../componets/ChatBox";

export default function ChatPage() {
  return (
    <div style={styles.container}>
      <h2>:speech_balloon: Real-Time Chat App</h2>
      <ChatBox />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial"
  }
};