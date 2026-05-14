
import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="message-input-row">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
        className="message-input"
      />
      <button onClick={handleSend} className="send-button">
        Send
      </button>
    </div>
  );
}
