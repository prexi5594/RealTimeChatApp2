import { useEffect, useState } from "react";
import MessageList from "./MessageList";
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

    // refresh immediately
    fetchMessages();

    // refresh again after bot response delay
    setTimeout(() => {
      fetchMessages();
    }, 1100);
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
    justifyContent: "space-between",
  },
};