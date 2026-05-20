import { useEffect, useState } from "react";
import MessageList from "./MessageList.jsx";
import MessageInput from "./MessageInput.jsx";
import { fetchMessages, sendMessage } from "../api/ChatApi";

export default function ChatBox({ room }) {
  const [messages, setMessages] = useState([]);

  
  const fetchMessages = async () => {
    const data = await fetchMessages(room);
    setMessages(data);
  };

 
  const handleSend = async (text) => {
    const username = localStorage.getItem("username") || "anonymous";

await sendMessage({
  room,
  username,
  text
});


fetchMessages();


setTimeout(() => {
  fetchMessages();
}, 1000);
  };


  useEffect(() => {
    if (!room) return;

fetchMessages();

const interval = setInterval(() => {
  fetchMessages();
}, 2000); // polling every 2s

return () => clearInterval(interval);
  }, [room]);

  
  return (
    <div className="chat-box">
      <h3>Room: {room}</h3>

  <MessageList messages={messages} />

  <MessageInput onSend={handleSend} />
</div>
  );
}

