chatbox
import { useEffect, useState } from "react";
import MessageList from "./messagelist";
import MessageInput from "./MessageInput";
import { getMessages, sendMessage } from "../api/ChatApi";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const data = await getMessages();
    setMessages(data);
  };

  const handleSend = async (text) => {
    await sendMessage(text);

fetchMessages();

// fetch again after bot reply
setTimeout(() => {
  fetchMessages();
}, 1100);
    // Update again after bot response
    setTimeout(() => fetchMessages(), 1100);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={styles.box}>
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}

const styles = {
  box: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
};