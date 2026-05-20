import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { fetchMessages as getMessages, sendMessage } from "../api/ChatApi";

export default function ChatBox({ room }) {
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    const data = await getMessages(room);
    setMessages(data);
  };

  const handleSend = async (text) => {
    const username = localStorage.getItem("username") || "You";

    await sendMessage({
      room,
      username,
      text,
    });

    loadMessages();
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