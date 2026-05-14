import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { getMessages, sendMessage } from "../api/ChatApi";

export default function ChatBox({ room }) {
  const [messages, setMessages] = useState([]);

  // =========================
  // FETCH MESSAGES BY ROOM
  // =========================
  const fetchMessages = async () => {
    const data = await getMessages(room);
    setMessages(data);
  };

  // =========================
  // SEND MESSAGE
  // =========================
  const handleSend = async (text) => {
    const username = localStorage.getItem("username") || "anonymous";

await sendMessage({
  room,
  username,
  text
});

// refresh immediately
fetchMessages();

// optional refresh delay (for sync)
setTimeout(() => {
  fetchMessages();
}, 1000);
  };

  // =========================
  // LOAD + POLLING
  // =========================
  useEffect(() => {
    if (!room) return;

fetchMessages();

const interval = setInterval(() => {
  fetchMessages();
}, 2000); // polling every 2s

return () => clearInterval(interval);
  }, [room]);

  // =========================
  // UI
  // =========================
  return (
    <div className="chat-box">
      <h3>Room: {room}</h3>

  <MessageList messages={messages} />

  <MessageInput onSend={handleSend} />
</div>
  );
}

