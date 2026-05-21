import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { fetchMessages, sendMessage } from "../api/ChatApi";

export default function ChatBox({ room }) {
  const [messages, setMessages] = useState([]);


  const loadMessages = async () => {
    if (!room) return;

    try {
      const data = await fetchMessages(room);
      setMessages(Array.isArray(data) ? data : data.messages || []);
    } catch (err) {
      console.log("Error loading messages:", err);
    }
  };

  const handleSend = async (text) => {
    const username = localStorage.getItem("username") || "You";

    try {
      await sendMessage({
        room,
        username,
        message: text, // IMPORTANT: backend expects "message"
      });

      loadMessages(); // refresh after sending
    } catch (err) {
      console.log("Error sending message:", err);
    }
  };


  useEffect(() => {
    if (!room) return;

    loadMessages();

    const interval = setInterval(() => {
      loadMessages();
    }, 2000);

    return () => clearInterval(interval);
  }, [room]);

  return (
    <div className="chat-box">
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}